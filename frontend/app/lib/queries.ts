import { gql } from "@apollo/client"

// Enum types matching your GraphQL schema
export type MarketStatus = "OPEN" | "CLOSED" | "RESOLVED"
export type BetStatus = "PENDING" | "WON" | "LOST" | "VOIDED"

// Define the structure of a single Market object
export interface Market {
    id: string;
    title: string;
    description: string;
    category: string;
    yesOdds: number;
    noOdds: number;
    totalVolume: number;
    status: MarketStatus;
    resolutionDate?: string;
    outcome?: boolean;
}

// Define the structure of a Bet object
export interface Bet {
    id: string;
    marketId?: string;
    userId?: string;
    amount: number;
    prediction: boolean;
    odds: number;
    potentialPayout: number;
    status: BetStatus;
    createdAt?: string;
}

// Define the structure of a User object
export interface User {
    id: string;
    username: string;
    email: string;
    balance: number;
    totalBets: number;
    winRate: number;
    totalPnL: number;
}

// Define the structure of a LeaderboardEntry object
export interface LeaderboardEntry {
    rank: number;
    userId: string;
    username: string;
    pnl: number;
    winRate: number;
    totalBets: number;
}

// Define the structure of MarketOdds object
export interface MarketOdds {
    id: string;
    yesOdds: number;
    noOdds: number;
    confidence: number;
    timestamp: string;
}

// Define the full shape of the data returned by queries
export interface GetMarketsData {
    markets: Market[];
}

export interface GetMarketData {
    market: Market & {
        bets: Bet[];
    };
}

export interface GetUserData {
    user: User;
}

export interface GetUserBetsData {
    userBets: Bet[];
}

export interface GetLeaderboardData {
    leaderboard: LeaderboardEntry[];
}

export interface GetMarketOddsData {
    marketOdds: MarketOdds;
}

// Define the variables types for strict typing
export interface GetMarketsVariables {
    limit?: number;
    offset?: number;
    status?: MarketStatus;
}

export interface GetMarketVariables {
    id: string;
}

export interface GetUserVariables {
    id: string;
}

export interface GetUserBetsVariables {
    userId: string;
    limit?: number;
}

export interface GetLeaderboardVariables {
    limit?: number;
}

export interface GetMarketOddsVariables {
    marketId: string;
}

export interface PlaceBetInput {
    marketId: string;
    userId: string;
    amount: number;
    prediction: boolean;
}

export interface PlaceBetVariables {
    input: PlaceBetInput;
}

export interface PlaceBetData {
    placeBet: {
        success: boolean;
        bet?: Bet;
        message: string;
    };
}

export interface CreateMarketInput {
    title: string;
    description: string;
    category: string;
    resolutionDate: string;
}

export interface CreateMarketVariables {
    input: CreateMarketInput;
}

export interface CreateMarketData {
    createMarket: Market;
}

export interface ResolveMarketVariables {
    marketId: string;
    outcome: boolean;
}

export interface ResolveMarketData {
    resolveMarket: Market;
}

// QUERIES
export const GET_MARKETS = gql`
  query GetMarkets($status: MarketStatus, $limit: Int, $offset: Int) {
    markets(status: $status, limit: $limit, offset: $offset) {
      id
      title
      description
      category
      yesOdds
      noOdds
      totalVolume
      status
      resolutionDate
    }
  }
`

export const GET_MARKET = gql`
  query GetMarket($id: ID!) {
    market(id: $id) {
      id
      title
      description
      category
      yesOdds
      noOdds
      totalVolume
      status
      resolutionDate
      bets {
        id
        amount
        odds
        prediction
        status
      }
    }
  }
`

export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      username
      email
      balance
      totalBets
      winRate
      totalPnL
    }
  }
`

export const GET_USER_BETS = gql`
  query GetUserBets($userId: ID!, $limit: Int) {
    userBets(userId: $userId, limit: $limit) {
      id
      marketId
      amount
      prediction
      odds
      potentialPayout
      status
      createdAt
    }
  }
`

export const GET_LEADERBOARD = gql`
  query GetLeaderboard($limit: Int) {
    leaderboard(limit: $limit) {
      rank
      userId
      username
      pnl
      winRate
      totalBets
    }
  }
`

export const GET_MARKET_ODDS = gql`
  query GetMarketOdds($marketId: ID!) {
    marketOdds(marketId: $marketId) {
      id
      yesOdds
      noOdds
      confidence
      timestamp
    }
  }
`

// MUTATIONS
export const PLACE_BET = gql`
  mutation PlaceBet($input: PlaceBetInput!) {
    placeBet(input: $input) {
      success
      bet {
        id
        amount
        odds
        potentialPayout
        status
      }
      message
    }
  }
`

export const CREATE_MARKET = gql`
  mutation CreateMarket($input: CreateMarketInput!) {
    createMarket(input: $input) {
      id
      title
      description
      status
      yesOdds
      noOdds
    }
  }
`

export const RESOLVE_MARKET = gql`
  mutation ResolveMarket($marketId: ID!, $outcome: Boolean!) {
    resolveMarket(marketId: $marketId, outcome: $outcome) {
      id
      status
      outcome
    }
  }
`