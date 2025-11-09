import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("Seeding database...")

  // Create demo users
  const user1 = await prisma.user.upsert({
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
  })

  const user2 = await prisma.user.upsert({
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
  })

  const user3 = await prisma.user.upsert({
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
  })

  // Create demo markets
  const market1 = await prisma.market.create({
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
  })

  const market2 = await prisma.market.create({
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
  })

  const market3 = await prisma.market.create({
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
  })

  // Create demo odds history
  await prisma.marketOdds.create({
    data: {
      marketId: market1.id,
      yesOdds: 1.85,
      noOdds: 2.1,
      confidence: 0.76,
    },
  })

  await prisma.marketOdds.create({
    data: {
      marketId: market2.id,
      yesOdds: 2.5,
      noOdds: 1.6,
      confidence: 0.62,
    },
  })

  // Create demo bets
  await prisma.bet.create({
    data: {
      marketId: market1.id,
      userId: user1.id,
      amount: 500,
      prediction: true,
      odds: 1.85,
      potentialPayout: 925,
      status: "PENDING",
    },
  })

  await prisma.bet.create({
    data: {
      marketId: market1.id,
      userId: user2.id,
      amount: 300,
      prediction: false,
      odds: 2.1,
      potentialPayout: 630,
      status: "PENDING",
    },
  })

  await prisma.bet.create({
    data: {
      marketId: market2.id,
      userId: user3.id,
      amount: 750,
      prediction: true,
      odds: 2.5,
      potentialPayout: 1875,
      status: "PENDING",
    },
  })

  console.log("Database seeded successfully!")
  console.log(`Created ${3} users`)
  console.log(`Created ${3} markets`)
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
