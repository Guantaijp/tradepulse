import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { PrismaClient } from "@prisma/client";
import fetch from "node-fetch";
import cors from "cors";
import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import http from "http";

type MarketStatus = "OPEN" | "CLOSED" | "RESOLVED";

const prisma = new PrismaClient();

// GraphQL Schema
const typeDefs = `#graphql
  type Query {
    market(id: ID!): Market
    markets(status: MarketStatus, limit: Int, offset: Int): [Market!]!
    user(id: ID!): User
    userBets(userId: ID!, limit: Int): [Bet!]!
    leaderboard(limit: Int): [LeaderboardEntry!]!
    marketOdds(marketId: ID!): MarketOdds
  }

  type Mutation {
    placeBet(input: PlaceBetInput!): BetResult!
    createMarket(input: CreateMarketInput!): Market!
    resolveMarket(marketId: ID!, outcome: Boolean!): Market!
    updateUserProfile(input: UpdateUserInput!): User!
  }

  type Market {
    id: ID!
    title: String!
    description: String!
    category: String!
    yesOdds: Float!
    noOdds: Float!
    totalVolume: Float!
    resolutionDate: String!
    status: MarketStatus!
    outcome: Boolean
    createdAt: String!
    updatedAt: String!
    bets: [Bet!]!
    odds: [MarketOdds!]!
  }

  enum MarketStatus {
    OPEN
    CLOSED
    RESOLVED
  }

  type MarketOdds {
    id: ID!
    marketId: ID!
    yesOdds: Float!
    noOdds: Float!
    confidence: Float!
    timestamp: String!
  }

  type Bet {
    id: ID!
    marketId: ID!
    userId: ID!
    amount: Float!
    prediction: Boolean!
    odds: Float!
    potentialPayout: Float!
    actualPayout: Float
    status: BetStatus!
    createdAt: String!
  }

  enum BetStatus {
    PENDING
    WON
    LOST
    VOIDED
  }

  type User {
    id: ID!
    username: String!
    email: String!
    balance: Float!
    totalBets: Int!
    winRate: Float!
    totalPnL: Float!
    createdAt: String!
    bets: [Bet!]!
  }

  type LeaderboardEntry {
    rank: Int!
    userId: ID!
    username: String!
    pnl: Float!
    winRate: Float!
    totalBets: Int!
  }

  type BetResult {
    success: Boolean!
    bet: Bet
    message: String!
  }

  input PlaceBetInput {
    marketId: ID!
    userId: ID!
    amount: Float!
    prediction: Boolean!
  }

  input CreateMarketInput {
    title: String!
    description: String!
    category: String!
    resolutionDate: String!
  }

  input UpdateUserInput {
    userId: ID!
    username: String
    email: String
  }
`;

// Resolvers
const resolvers = {
  Query: {
    market: async (_: any, { id }: { id: string }) => {
      return await prisma.market.findUnique({
        where: { id },
        include: { bets: true, odds: true },
      });
    },

    markets: async (
      _: any,
      { status, limit = 10, offset = 0 }: { status?: MarketStatus; limit: number; offset: number }
    ) => {
      return await prisma.market.findMany({
        where: status ? { status } : {},
        take: limit,
        skip: offset,
        include: { bets: true, odds: true },
        orderBy: { createdAt: "desc" },
      });
    },

    user: async (_: any, { id }: { id: string }) => {
      return await prisma.user.findUnique({
        where: { id },
        include: { bets: true },
      });
    },

    userBets: async (_: any, { userId, limit = 10 }: { userId: string; limit: number }) => {
      return await prisma.bet.findMany({
        where: { userId },
        take: limit,
        orderBy: { createdAt: "desc" },
      });
    },

    leaderboard: async (_: any, { limit = 10 }: { limit: number }) => {
      const users = await prisma.user.findMany({
        take: limit,
        orderBy: { totalPnL: "desc" },
      });

      return users.map((user: any, index: number) => ({
        rank: index + 1,
        userId: user.id,
        username: user.username,
        pnl: user.totalPnL,
        winRate: user.winRate,
        totalBets: user.totalBets,
      }));
    },

    marketOdds: async (_: any, { marketId }: { marketId: string }) => {
      const odds = await prisma.marketOdds.findFirst({
        where: { marketId },
        orderBy: { createdAt: "desc" },
      });
      return odds;
    },
  },

  Mutation: {
    placeBet: async (
      _: any,
      { input }: { input: { marketId: string; userId: string; amount: number; prediction: boolean } }
    ) => {
      try {
        const market = await prisma.market.findUnique({
          where: { id: input.marketId },
        });

        if (!market) {
          return { success: false, message: "Market not found" };
        }

        if (market.status !== "OPEN") {
          return { success: false, message: "Market is not open for betting" };
        }

        const user = await prisma.user.findUnique({
          where: { id: input.userId },
        });

        if (!user) {
          return { success: false, message: "User not found" };
        }

        if (user.balance < input.amount) {
          return { success: false, message: "Insufficient balance" };
        }

        const odds = input.prediction ? market.yesOdds : market.noOdds;
        const potentialPayout = input.amount * odds;

        const bet = await prisma.bet.create({
          data: {
            marketId: input.marketId,
            userId: input.userId,
            amount: input.amount,
            prediction: input.prediction,
            odds,
            potentialPayout,
            status: "PENDING",
          },
        });

        // Update market total volume
        await prisma.market.update({
          where: { id: input.marketId },
          data: {
            totalVolume: {
              increment: input.amount,
            },
          },
        });

        // Update user balance
        await prisma.user.update({
          where: { id: input.userId },
          data: {
            balance: {
              decrement: input.amount,
            },
            totalBets: {
              increment: 1,
            },
          },
        });

        return { success: true, bet, message: "Bet placed successfully" };
      } catch (error) {
        console.error("Place bet error:", error);
        return { success: false, message: "Failed to place bet" };
      }
    },

    createMarket: async (
      _: any,
      { input }: { input: { title: string; description: string; category: string; resolutionDate: string } }
    ) => {
      try {
        // Call odds engine to get initial odds
        const oddsResponse = await fetch("http://localhost:8000/api/odds/calculate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            market_id: "new",
            title: input.title,
            category: input.category,
          }),
        });

        const oddsData = (await oddsResponse.json()) as { yes_odds: number; no_odds: number };

        const market = await prisma.market.create({
          data: {
            title: input.title,
            description: input.description,
            category: input.category,
            resolutionDate: new Date(input.resolutionDate),
            yesOdds: oddsData.yes_odds,
            noOdds: oddsData.no_odds,
            status: "OPEN",
            totalVolume: 0,
          },
        });

        return market;
      } catch (error) {
        console.error("Create market error:", error);
        throw new Error("Failed to create market");
      }
    },

    resolveMarket: async (_: any, { marketId, outcome }: { marketId: string; outcome: boolean }) => {
      try {
        const market = await prisma.market.update({
          where: { id: marketId },
          data: {
            status: "RESOLVED",
            outcome,
          },
        });

        // Calculate payouts for all bets
        const bets = await prisma.bet.findMany({
          where: { marketId },
        });

        for (const bet of bets) {
          const won = bet.prediction === outcome;
          const actualPayout = won ? bet.potentialPayout : 0;

          await prisma.bet.update({
            where: { id: bet.id },
            data: {
              status: won ? "WON" : "LOST",
              actualPayout,
            },
          });

          // Update user balance and stats
          await prisma.user.update({
            where: { id: bet.userId },
            data: {
              balance: {
                increment: actualPayout,
              },
              totalPnL: {
                increment: actualPayout - bet.amount,
              },
            },
          });
        }

        // Update win rates for all users who bet on this market
        const userIds = [...new Set(bets.map((bet: any) => bet.userId))];
        for (const userId of userIds) {
          const userBets = await prisma.bet.findMany({
            where: { userId, status: { in: ["WON", "LOST"] } },
          });

          const wonBets = userBets.filter((bet: any) => bet.status === "WON").length;
          const winRate = userBets.length > 0 ? (wonBets / userBets.length) * 100 : 0;

          await prisma.user.update({
            where: { id: userId },
            data: { winRate },
          });
        }

        return market;
      } catch (error) {
        console.error("Resolve market error:", error);
        throw new Error("Failed to resolve market");
      }
    },

    updateUserProfile: async (
      _: any,
      { input }: { input: { userId: string; username?: string; email?: string } }
    ) => {
      return await prisma.user.update({
        where: { id: input.userId },
        data: {
          ...(input.username && { username: input.username }),
          ...(input.email && { email: input.email }),
        },
      });
    },
  },
};

// Start Apollo Server with Express and CORS
async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  const PORT = Number(process.env.GRAPHQL_PORT) || 4000;

  // Configure CORS
  app.use(
    "/graphql",
    cors<cors.CorsRequest>({
      origin: ["http://localhost:3000", "https://tradepulse-gules.vercel.app"], 
      credentials: true,
    }),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }: any) => {
        return { req };
      },
    })
  );

  await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));

  console.log(`🚀 GraphQL Server running on http://localhost:${PORT}/graphql`);
  console.log(`📊 Access GraphQL Playground at http://localhost:${PORT}/graphql`);
}

// Start the server
startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});