# TradePulse Backend Architecture

## Services Overview

### 1. Linera Contracts (Rust)
Microchain-based smart contracts for market creation, bet settlement, and liquidity management.

**Location:** `services/linera-contracts/`

**Setup:**
\`\`\`bash
cd services/linera-contracts
cargo build --release
\`\`\`

### 2. AI Odds Engine (Python/FastAPI)
Real-time odds calculation and prediction engine using ML models.

**Location:** `services/odds-engine/`

**Setup:**
\`\`\`bash
cd services/odds-engine
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python main.py
\`\`\`

Runs on `http://localhost:8000`

### 3. GraphQL API Bridge
Unified GraphQL API connecting all services with real-time subscriptions.

**Location:** `services/graphql-api/`

**Setup:**
\`\`\`bash
cd services/graphql-api
npm install
npm run dev
\`\`\`

Runs on `http://localhost:4000`

### 4. Database Layer (Prisma/PostgreSQL)
PostgreSQL database with Prisma ORM for data management and migrations.

**Location:** `services/database/`

**Setup:**
\`\`\`bash
cd services/database
npm install
npx prisma migrate dev --name init
npx prisma db seed
\`\`\`

## Architecture Flow

\`\`\`
Next.js Frontend
       ↓
API Routes (app/api/*)
       ↓
GraphQL API (Port 4000)
       ↓
  ┌─────┼─────┐
  ↓     ↓     ↓
Linera Odds   PostgreSQL
      Engine
\`\`\`

## Environment Variables

Create `.env.local` in project root with:

\`\`\`env
NEXT_PUBLIC_GRAPHQL_API=http://localhost:4000/graphql
ODDS_ENGINE_API=http://localhost:8000
DATABASE_URL=postgresql://user:password@localhost:5432/tradepulse
LINERA_RPC_URL=http://localhost:19100
\`\`\`

## Running All Services

\`\`\`bash
# Terminal 1: PostgreSQL (ensure running)
docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=password postgres

# Terminal 2: Odds Engine
cd backend/services/odds-engine
python main.py

# Terminal 3: GraphQL API
cd backend/services/graphql-api
npm run dev

# Terminal 4: Next.js Frontend
npm run dev
\`\`\`

## API Documentation

All backend services expose REST/GraphQL endpoints that Next.js API routes proxy to.

- **Markets:** `GET /api/markets`, `POST /api/markets`
- **Bets:** `POST /api/bets`
- **Odds:** `POST /api/odds`
