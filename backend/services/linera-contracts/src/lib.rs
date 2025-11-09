use linera_sdk::base::Amount;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Market {
    pub id: String,
    pub title: String,
    pub description: String,
    pub yes_odds: f64,
    pub no_odds: f64,
    pub total_liquidity: Amount,
    pub resolution_time: u64,
    pub status: MarketStatus,
}

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq)]
pub enum MarketStatus {
    Open,
    Closed,
    Resolved,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Bet {
    pub market_id: String,
    pub user: String,
    pub amount: Amount,
    pub prediction: bool, // true = YES, false = NO
    pub odds: f64,
    pub potential_payout: Amount,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct MarketResolution {
    pub market_id: String,
    pub outcome: bool,
    pub timestamp: u64,
}

impl Market {
    pub fn new(id: String, title: String, description: String) -> Self {
        Self {
            id,
            title,
            description,
            yes_odds: 1.5,
            no_odds: 2.0,
            total_liquidity: Amount::new(1_000_000),
            resolution_time: 1_700_000_000,
            status: MarketStatus::Open,
        }
    }

    pub fn calculate_payout(&self, bet_amount: Amount, prediction: bool) -> Amount {
        let odds = if prediction { self.yes_odds } else { self.no_odds };
        Amount::new((bet_amount.as_u128() as f64 * odds) as u128)
    }
}
