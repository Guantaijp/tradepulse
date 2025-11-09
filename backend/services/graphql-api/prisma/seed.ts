import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("Seeding database...")

  // Create 12 demo users
  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: "alice@tradepulse.io" },
      update: {},
      create: {
        email: "alice@tradepulse.io",
        username: "alice_trader",
        balance: 5000,
        totalBets: 24,
        winRate: 0.75,
        totalPnL: 1250,
        walletAddress: "0x1234...5678",
      },
    }),
    prisma.user.upsert({
      where: { email: "bob@tradepulse.io" },
      update: {},
      create: {
        email: "bob@tradepulse.io",
        username: "bob_predictor",
        balance: 3200,
        totalBets: 18,
        winRate: 0.67,
        totalPnL: 850,
        walletAddress: "0x9876...5432",
      },
    }),
    prisma.user.upsert({
      where: { email: "carol@tradepulse.io" },
      update: {},
      create: {
        email: "carol@tradepulse.io",
        username: "carol_analyst",
        balance: 7500,
        totalBets: 42,
        winRate: 0.83,
        totalPnL: 2100,
        walletAddress: "0x5555...9999",
      },
    }),
    prisma.user.upsert({
      where: { email: "david@tradepulse.io" },
      update: {},
      create: {
        email: "david@tradepulse.io",
        username: "david_whale",
        balance: 12000,
        totalBets: 35,
        winRate: 0.71,
        totalPnL: 3500,
        walletAddress: "0xAAAA...BBBB",
      },
    }),
    prisma.user.upsert({
      where: { email: "emma@tradepulse.io" },
      update: {},
      create: {
        email: "emma@tradepulse.io",
        username: "emma_sharp",
        balance: 4500,
        totalBets: 27,
        winRate: 0.78,
        totalPnL: 1800,
        walletAddress: "0xCCCC...DDDD",
      },
    }),
    prisma.user.upsert({
      where: { email: "frank@tradepulse.io" },
      update: {},
      create: {
        email: "frank@tradepulse.io",
        username: "frank_degen",
        balance: 2800,
        totalBets: 52,
        winRate: 0.54,
        totalPnL: -450,
        walletAddress: "0xEEEE...FFFF",
      },
    }),
    prisma.user.upsert({
      where: { email: "grace@tradepulse.io" },
      update: {},
      create: {
        email: "grace@tradepulse.io",
        username: "grace_hodler",
        balance: 6200,
        totalBets: 15,
        winRate: 0.87,
        totalPnL: 2700,
        walletAddress: "0x1111...2222",
      },
    }),
    prisma.user.upsert({
      where: { email: "henry@tradepulse.io" },
      update: {},
      create: {
        email: "henry@tradepulse.io",
        username: "henry_bull",
        balance: 8900,
        totalBets: 31,
        winRate: 0.68,
        totalPnL: 1950,
        walletAddress: "0x3333...4444",
      },
    }),
    prisma.user.upsert({
      where: { email: "iris@tradepulse.io" },
      update: {},
      create: {
        email: "iris@tradepulse.io",
        username: "iris_bear",
        balance: 3700,
        totalBets: 22,
        winRate: 0.73,
        totalPnL: 1100,
        walletAddress: "0x5555...6666",
      },
    }),
    prisma.user.upsert({
      where: { email: "jack@tradepulse.io" },
      update: {},
      create: {
        email: "jack@tradepulse.io",
        username: "jack_swing",
        balance: 5500,
        totalBets: 38,
        winRate: 0.61,
        totalPnL: 450,
        walletAddress: "0x7777...8888",
      },
    }),
    prisma.user.upsert({
      where: { email: "kate@tradepulse.io" },
      update: {},
      create: {
        email: "kate@tradepulse.io",
        username: "kate_quant",
        balance: 9200,
        totalBets: 29,
        winRate: 0.79,
        totalPnL: 2850,
        walletAddress: "0x9999...AAAA",
      },
    }),
    prisma.user.upsert({
      where: { email: "leo@tradepulse.io" },
      update: {},
      create: {
        email: "leo@tradepulse.io",
        username: "leo_scalper",
        balance: 4100,
        totalBets: 61,
        winRate: 0.64,
        totalPnL: 850,
        walletAddress: "0xBBBB...CCCC",
      },
    }),
  ])

  // Create 12 demo markets
  const markets = await Promise.all([
    prisma.market.create({
      data: {
        title: "Will Bitcoin reach $100k by end of 2024?",
        description: "Predicts if BTC will touch $100,000 USD",
        category: "Crypto",
        yesOdds: 1.85,
        noOdds: 2.1,
        totalVolume: 45000,
        totalLiquidity: 50000,
        yesBets: 28000,
        noBets: 17000,
        resolutionDate: new Date("2024-12-31"),
        status: "OPEN",
      },
    }),
    prisma.market.create({
      data: {
        title: "Will AI pass medical exams in 2024?",
        description: "Predicts if any AI will pass USMLE Step 3",
        category: "AI",
        yesOdds: 2.5,
        noOdds: 1.6,
        totalVolume: 32000,
        totalLiquidity: 35000,
        yesBets: 12000,
        noBets: 20000,
        resolutionDate: new Date("2024-12-31"),
        status: "OPEN",
      },
    }),
    prisma.market.create({
      data: {
        title: "Will SPY reach $500 in 2024?",
        description: "S&P 500 ETF prediction",
        category: "Markets",
        yesOdds: 1.95,
        noOdds: 1.9,
        totalVolume: 52000,
        totalLiquidity: 60000,
        yesBets: 30000,
        noBets: 22000,
        resolutionDate: new Date("2024-12-31"),
        status: "OPEN",
      },
    }),
    prisma.market.create({
      data: {
        title: "Will Ethereum reach $5k in Q1 2025?",
        description: "ETH price prediction for early 2025",
        category: "Crypto",
        yesOdds: 2.2,
        noOdds: 1.75,
        totalVolume: 38000,
        totalLiquidity: 42000,
        yesBets: 15000,
        noBets: 23000,
        resolutionDate: new Date("2025-03-31"),
        status: "OPEN",
      },
    }),
    prisma.market.create({
      data: {
        title: "Will Tesla stock hit $300 in 2024?",
        description: "TSLA stock price prediction",
        category: "Markets",
        yesOdds: 1.7,
        noOdds: 2.3,
        totalVolume: 41000,
        totalLiquidity: 45000,
        yesBets: 25000,
        noBets: 16000,
        resolutionDate: new Date("2024-12-31"),
        status: "OPEN",
      },
    }),
    prisma.market.create({
      data: {
        title: "Will GPT-5 be released in 2024?",
        description: "Predicts OpenAI GPT-5 release",
        category: "AI",
        yesOdds: 3.0,
        noOdds: 1.4,
        totalVolume: 28000,
        totalLiquidity: 30000,
        yesBets: 8000,
        noBets: 20000,
        resolutionDate: new Date("2024-12-31"),
        status: "OPEN",
      },
    }),
    prisma.market.create({
      data: {
        title: "Will Fed cut rates by 100bps in 2024?",
        description: "Federal Reserve rate cut prediction",
        category: "Markets",
        yesOdds: 2.8,
        noOdds: 1.5,
        totalVolume: 55000,
        totalLiquidity: 62000,
        yesBets: 18000,
        noBets: 37000,
        resolutionDate: new Date("2024-12-31"),
        status: "OPEN",
      },
    }),
    prisma.market.create({
      data: {
        title: "Will Solana flip Ethereum in TVL?",
        description: "Total Value Locked comparison",
        category: "Crypto",
        yesOdds: 4.5,
        noOdds: 1.25,
        totalVolume: 22000,
        totalLiquidity: 25000,
        yesBets: 5000,
        noBets: 17000,
        resolutionDate: new Date("2025-06-30"),
        status: "OPEN",
      },
    }),
    prisma.market.create({
      data: {
        title: "Will unemployment rate exceed 5% in 2024?",
        description: "US unemployment rate prediction",
        category: "Markets",
        yesOdds: 2.1,
        noOdds: 1.85,
        totalVolume: 34000,
        totalLiquidity: 38000,
        yesBets: 14000,
        noBets: 20000,
        resolutionDate: new Date("2024-12-31"),
        status: "OPEN",
      },
    }),
    prisma.market.create({
      data: {
        title: "Will Apple launch a foldable iPhone in 2024?",
        description: "Apple product launch prediction",
        category: "Tech",
        yesOdds: 5.0,
        noOdds: 1.2,
        totalVolume: 18000,
        totalLiquidity: 20000,
        yesBets: 3500,
        noBets: 14500,
        resolutionDate: new Date("2024-12-31"),
        status: "OPEN",
      },
    }),
    prisma.market.create({
      data: {
        title: "Will Meta's metaverse user count hit 100M?",
        description: "Meta platform adoption prediction",
        category: "Tech",
        yesOdds: 3.5,
        noOdds: 1.35,
        totalVolume: 25000,
        totalLiquidity: 28000,
        yesBets: 7000,
        noBets: 18000,
        resolutionDate: new Date("2025-12-31"),
        status: "OPEN",
      },
    }),
    prisma.market.create({
      data: {
        title: "Will any DeFi protocol get hacked for >$100M?",
        description: "DeFi security prediction",
        category: "Crypto",
        yesOdds: 1.6,
        noOdds: 2.5,
        totalVolume: 48000,
        totalLiquidity: 52000,
        yesBets: 32000,
        noBets: 16000,
        resolutionDate: new Date("2024-12-31"),
        status: "OPEN",
      },
    }),
  ])

  // Create 12 odds history entries
  await Promise.all([
    prisma.marketOdds.create({
      data: {
        marketId: markets[0].id,
        yesOdds: 1.85,
        noOdds: 2.1,
        confidence: 0.76,
      },
    }),
    prisma.marketOdds.create({
      data: {
        marketId: markets[1].id,
        yesOdds: 2.5,
        noOdds: 1.6,
        confidence: 0.62,
      },
    }),
    prisma.marketOdds.create({
      data: {
        marketId: markets[2].id,
        yesOdds: 1.95,
        noOdds: 1.9,
        confidence: 0.72,
      },
    }),
    prisma.marketOdds.create({
      data: {
        marketId: markets[3].id,
        yesOdds: 2.2,
        noOdds: 1.75,
        confidence: 0.68,
      },
    }),
    prisma.marketOdds.create({
      data: {
        marketId: markets[4].id,
        yesOdds: 1.7,
        noOdds: 2.3,
        confidence: 0.79,
      },
    }),
    prisma.marketOdds.create({
      data: {
        marketId: markets[5].id,
        yesOdds: 3.0,
        noOdds: 1.4,
        confidence: 0.58,
      },
    }),
    prisma.marketOdds.create({
      data: {
        marketId: markets[6].id,
        yesOdds: 2.8,
        noOdds: 1.5,
        confidence: 0.65,
      },
    }),
    prisma.marketOdds.create({
      data: {
        marketId: markets[7].id,
        yesOdds: 4.5,
        noOdds: 1.25,
        confidence: 0.45,
      },
    }),
    prisma.marketOdds.create({
      data: {
        marketId: markets[8].id,
        yesOdds: 2.1,
        noOdds: 1.85,
        confidence: 0.71,
      },
    }),
    prisma.marketOdds.create({
      data: {
        marketId: markets[9].id,
        yesOdds: 5.0,
        noOdds: 1.2,
        confidence: 0.42,
      },
    }),
    prisma.marketOdds.create({
      data: {
        marketId: markets[10].id,
        yesOdds: 3.5,
        noOdds: 1.35,
        confidence: 0.55,
      },
    }),
    prisma.marketOdds.create({
      data: {
        marketId: markets[11].id,
        yesOdds: 1.6,
        noOdds: 2.5,
        confidence: 0.81,
      },
    }),
  ])

  // Create 12 demo bets
  await Promise.all([
    prisma.bet.create({
      data: {
        marketId: markets[0].id,
        userId: users[0].id,
        amount: 500,
        prediction: true,
        odds: 1.85,
        potentialPayout: 925,
        status: "PENDING",
      },
    }),
    prisma.bet.create({
      data: {
        marketId: markets[0].id,
        userId: users[1].id,
        amount: 300,
        prediction: false,
        odds: 2.1,
        potentialPayout: 630,
        status: "PENDING",
      },
    }),
    prisma.bet.create({
      data: {
        marketId: markets[1].id,
        userId: users[2].id,
        amount: 750,
        prediction: true,
        odds: 2.5,
        potentialPayout: 1875,
        status: "PENDING",
      },
    }),
    prisma.bet.create({
      data: {
        marketId: markets[2].id,
        userId: users[3].id,
        amount: 1200,
        prediction: true,
        odds: 1.95,
        potentialPayout: 2340,
        status: "PENDING",
      },
    }),
    prisma.bet.create({
      data: {
        marketId: markets[3].id,
        userId: users[4].id,
        amount: 600,
        prediction: false,
        odds: 1.75,
        potentialPayout: 1050,
        status: "PENDING",
      },
    }),
    prisma.bet.create({
      data: {
        marketId: markets[4].id,
        userId: users[5].id,
        amount: 450,
        prediction: true,
        odds: 1.7,
        potentialPayout: 765,
        status: "PENDING",
      },
    }),
    prisma.bet.create({
      data: {
        marketId: markets[5].id,
        userId: users[6].id,
        amount: 800,
        prediction: false,
        odds: 1.4,
        potentialPayout: 1120,
        status: "PENDING",
      },
    }),
    prisma.bet.create({
      data: {
        marketId: markets[6].id,
        userId: users[7].id,
        amount: 950,
        prediction: false,
        odds: 1.5,
        potentialPayout: 1425,
        status: "PENDING",
      },
    }),
    prisma.bet.create({
      data: {
        marketId: markets[7].id,
        userId: users[8].id,
        amount: 350,
        prediction: false,
        odds: 1.25,
        potentialPayout: 437.5,
        status: "PENDING",
      },
    }),
    prisma.bet.create({
      data: {
        marketId: markets[8].id,
        userId: users[9].id,
        amount: 550,
        prediction: true,
        odds: 2.1,
        potentialPayout: 1155,
        status: "PENDING",
      },
    }),
    prisma.bet.create({
      data: {
        marketId: markets[9].id,
        userId: users[10].id,
        amount: 1000,
        prediction: false,
        odds: 1.2,
        potentialPayout: 1200,
        status: "PENDING",
      },
    }),
    prisma.bet.create({
      data: {
        marketId: markets[11].id,
        userId: users[11].id,
        amount: 650,
        prediction: true,
        odds: 1.6,
        potentialPayout: 1040,
        status: "PENDING",
      },
    }),
  ])

  console.log("Database seeded successfully!")
  console.log(`Created ${users.length} users`)
  console.log(`Created ${markets.length} markets`)
  console.log(`Created 12 odds history entries`)
  console.log(`Created 12 bets`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })