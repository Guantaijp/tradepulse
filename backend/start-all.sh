#!/bin/bash

echo "🚀 Starting TradePulse Backend Services..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if PostgreSQL is running
echo -e "${YELLOW}Checking PostgreSQL...${NC}"
if ! psql -U postgres -d tradepulse -c "SELECT 1" > /dev/null 2>&1; then
  echo -e "${YELLOW}Creating tradepulse database...${NC}"
  createdb tradepulse
fi

# Start database migrations
echo -e "${YELLOW}Running database migrations...${NC}"
cd services/database
npm install > /dev/null 2>&1
npx prisma migrate deploy
npx prisma db seed
cd ../..

# Start AI Odds Engine in background
echo -e "${GREEN}Starting AI Odds Engine (Python)...${NC}"
cd services/odds-engine
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt > /dev/null 2>&1
python main.py &
ODDS_PID=$!
echo -e "${GREEN}✓ AI Odds Engine started (PID: $ODDS_PID)${NC}"
cd ../..

# Give odds engine time to start
sleep 2

# Start GraphQL API in background
echo -e "${GREEN}Starting GraphQL API (Node.js)...${NC}"
cd services/graphql-api
npm install > /dev/null 2>&1
npm run dev &
API_PID=$!
echo -e "${GREEN}✓ GraphQL API started (PID: $API_PID)${NC}"
cd ../..

echo ""
echo -e "${GREEN}================================${NC}"
echo -e "${GREEN}All services started successfully!${NC}"
echo -e "${GREEN}================================${NC}"
echo ""
echo "Service Endpoints:"
echo -e "  ${YELLOW}GraphQL API${NC}: http://localhost:4000"
echo -e "  ${YELLOW}GraphQL Playground${NC}: http://localhost:4000/graphql"
echo -e "  ${YELLOW}AI Odds Engine${NC}: http://localhost:8000"
echo -e "  ${YELLOW}AI Docs${NC}: http://localhost:8000/docs"
echo ""
echo "Frontend will connect automatically to: http://localhost:4000"
echo ""
echo "To stop all services, press Ctrl+C"
echo ""

# Keep script running
wait
