@echo off
setlocal enabledelayedexpansion

echo.
echo 🚀 Starting TradePulse Backend Services...
echo.

REM Check PostgreSQL
echo Checking PostgreSQL...
psql -U postgres -d tradepulse -c "SELECT 1" >nul 2>&1
if errorlevel 1 (
  echo Creating tradepulse database...
  createdb tradepulse
)

REM Database migrations
echo Running database migrations...
cd services\database
call npm install > nul 2>&1
call npx prisma migrate deploy
call npx prisma db seed
cd ..\..

REM Start AI Odds Engine
echo.
echo Starting AI Odds Engine (Python)...
cd services\odds-engine
python -m venv venv
call venv\Scripts\activate
pip install -r requirements.txt > nul 2>&1
start "TradePulse AI Odds Engine" python main.py
echo ✓ AI Odds Engine started
cd ..\..

REM Wait for odds engine
timeout /t 2 /nobreak

REM Start GraphQL API
echo Starting GraphQL API (Node.js)...
cd services\graphql-api
call npm install > nul 2>&1
start "TradePulse GraphQL API" npm run dev
echo ✓ GraphQL API started
cd ..\..

echo.
echo ================================
echo All services started!
echo ================================
echo.
echo Service Endpoints:
echo   GraphQL API: http://localhost:4000
echo   GraphQL Playground: http://localhost:4000/graphql
echo   AI Odds Engine: http://localhost:8000
echo   AI Docs: http://localhost:8000/docs
echo.
echo Frontend will connect to: http://localhost:4000
echo.
pause
