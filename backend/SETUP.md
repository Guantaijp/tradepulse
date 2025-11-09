# TradePulse Backend Setup Guide

## Prerequisites

Make sure you have installed:
- **Node.js 18+** - [Download](https://nodejs.org/)
- **Python 3.10+** - [Download](https://www.python.org/)
- **PostgreSQL 14+** - [Download](https://www.postgresql.org/)
- **Rust 1.70+** (optional, for Linera contracts) - [Install](https://rustup.rs/)

## Quick Start (5 minutes)

### Step 1: Database Setup
\`\`\`bash
# Create PostgreSQL database
createdb tradepulse

# Set environment variable
export DATABASE_URL="postgresql://user:password@localhost:5432/tradepulse"
\`\`\`

### Step 2: Initialize Database
\`\`\`bash
cd backend/services/database
npm install
npx prisma migrate deploy
npx prisma db seed
\`\`\`

This creates all tables and seeds sample data.

### Step 3: Start AI Odds Engine (Python)
\`\`\`bash
cd backend/services/odds-engine
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py
\`\`\`

The AI engine will start on `http://localhost:8000`

### Step 4: Start GraphQL API
\`\`\`bash
cd backend/services/graphql-api
npm install
npm run dev
\`\`\`

GraphQL server runs on `http://localhost:4000`
- GraphQL Playground: http://localhost:4000/graphql
- Health check: http://localhost:4000/health

### Step 5: Verify Backend is Running
\`\`\`bash
# Check all services
curl http://localhost:4000/health
curl http://localhost:8000/docs
\`\`\`

### Step 6: Connect Frontend
Frontend automatically connects to `http://localhost:4000` via GraphQL queries.

## Environment Variables

### Database
\`\`\`bash
DATABASE_URL=postgresql://user:password@localhost:5432/tradepulse
NODE_ENV=development
\`\`\`

### AI Odds Engine
\`\`\`bash
PYTHONUNBUFFERED=1
ML_MODEL_PATH=./models/odds_predictor.pkl
\`\`\`

### GraphQL API
\`\`\`bash
DATABASE_URL=postgresql://user:password@localhost:5432/tradepulse
GRAPHQL_PORT=4000
NODE_ENV=development
\`\`\`

## Service Endpoints

| Service | URL | Status |
|---------|-----|--------|
| GraphQL API | http://localhost:4000 | ✓ |
| GraphQL Playground | http://localhost:4000/graphql | ✓ |
| AI Odds Engine | http://localhost:8000 | ✓ |
| AI Docs | http://localhost:8000/docs | ✓ |

## Common Issues

### PostgreSQL Connection Error
\`\`\`bash
# Reset connection string and test
psql $DATABASE_URL -c "SELECT 1"
\`\`\`

### Python venv not activating
\`\`\`bash
# On Windows
cd backend/services/odds-engine && venv\Scripts\activate

# On macOS/Linux
cd backend/services/odds-engine && source venv/bin/activate
\`\`\`

### Port already in use
\`\`\`bash
# Find and kill process using port
lsof -ti:4000 | xargs kill -9  # Linux/Mac
netstat -ano | findstr :4000   # Windows
\`\`\`

## Architecture Overview

\`\`\`
Frontend (Next.js) ↔ GraphQL API (Port 4000)
↓
PostgreSQL Database
↓
AI Odds Engine (Port 8000)
\`\`\`

## Next Steps

1. ✅ Database initialized
2. ✅ AI Odds Engine running
3. ✅ GraphQL API running
4. ✅ Frontend connected
5. Start trading! Navigate to http://localhost:3000/start-trading

## Support

- Check logs in each service directory
- GraphQL Playground for API testing
- Use `npm run dev` for development with auto-reload
