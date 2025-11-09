-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  balance FLOAT DEFAULT 1000,
  total_bets INT DEFAULT 0,
  win_rate FLOAT DEFAULT 0,
  total_pnl FLOAT DEFAULT 0,
  wallet_address TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create markets table
CREATE TABLE IF NOT EXISTS markets (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  yes_odds FLOAT DEFAULT 1.8,
  no_odds FLOAT DEFAULT 2.0,
  total_volume FLOAT DEFAULT 0,
  total_liquidity FLOAT DEFAULT 0,
  yes_bets FLOAT DEFAULT 0,
  no_bets FLOAT DEFAULT 0,
  resolution_date TIMESTAMP NOT NULL,
  outcome BOOLEAN,
  status TEXT DEFAULT 'OPEN',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create bets table
CREATE TABLE IF NOT EXISTS bets (
  id TEXT PRIMARY KEY,
  market_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  amount FLOAT NOT NULL,
  prediction BOOLEAN NOT NULL,
  odds FLOAT NOT NULL,
  potential_payout FLOAT NOT NULL,
  actual_payout FLOAT,
  status TEXT DEFAULT 'PENDING',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (market_id) REFERENCES markets(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create market_odds table
CREATE TABLE IF NOT EXISTS market_odds (
  id TEXT PRIMARY KEY,
  market_id TEXT NOT NULL,
  yes_odds FLOAT NOT NULL,
  no_odds FLOAT NOT NULL,
  confidence FLOAT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (market_id) REFERENCES markets(id) ON DELETE CASCADE
);

-- Create trades table
CREATE TABLE IF NOT EXISTS trades (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  action TEXT NOT NULL,
  amount FLOAT NOT NULL,
  timestamp TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create indexes
CREATE INDEX idx_bets_market_id ON bets(market_id);
CREATE INDEX idx_bets_user_id ON bets(user_id);
CREATE INDEX idx_markets_status ON markets(status);
CREATE INDEX idx_market_odds_market_id ON market_odds(market_id);
CREATE INDEX idx_trades_user_id ON trades(user_id);
