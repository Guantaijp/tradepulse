from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import numpy as np
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="TradePulse AI Odds Engine")

class MarketRequest(BaseModel):
    market_id: str
    title: str
    description: str
    category: str
    resolution_date: str

class OddsResponse(BaseModel):
    market_id: str
    yes_odds: float
    no_odds: float
    confidence: float
    updated_at: str

class BetPrediction(BaseModel):
    market_id: str
    bet_amount: float
    prediction: bool
    user_id: str

# Simulated ML model for odds calculation
class OddsModel:
    def __init__(self):
        self.base_odds = {"yes": 1.8, "no": 2.0}
    
    def calculate_odds(self, market_data: dict) -> tuple:
        """Calculate dynamic odds based on market data"""
        # In production, this would use actual ML models
        sentiment_score = np.random.uniform(-1, 1)  # -1 to 1
        yes_odds = self.base_odds["yes"] + (sentiment_score * 0.5)
        no_odds = self.base_odds["no"] - (sentiment_score * 0.3)
        
        # Ensure odds are positive
        yes_odds = max(1.01, yes_odds)
        no_odds = max(1.01, no_odds)
        
        confidence = np.random.uniform(0.6, 0.95)
        
        return yes_odds, no_odds, confidence

model = OddsModel()

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "odds-engine"}

@app.post("/api/odds/calculate")
async def calculate_odds(market: MarketRequest) -> OddsResponse:
    """Calculate initial odds for a new market"""
    try:
        yes_odds, no_odds, confidence = model.calculate_odds({
            "title": market.title,
            "category": market.category
        })
        
        return OddsResponse(
            market_id=market.market_id,
            yes_odds=round(yes_odds, 2),
            no_odds=round(no_odds, 2),
            confidence=round(confidence, 3),
            updated_at=datetime.utcnow().isoformat()
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/odds/predict-payout")
async def predict_payout(bet: BetPrediction) -> dict:
    """Predict payout for a given bet"""
    try:
        odds = 1.8 if bet.prediction else 2.0
        payout = bet.bet_amount * odds
        
        return {
            "market_id": bet.market_id,
            "bet_amount": bet.bet_amount,
            "odds": odds,
            "potential_payout": round(payout, 2),
            "profit": round(payout - bet.bet_amount, 2)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/odds/update-batch")
async def update_odds_batch(market_ids: List[str]) -> List[OddsResponse]:
    """Update odds for multiple markets"""
    results = []
    for market_id in market_ids:
        yes_odds, no_odds, confidence = model.calculate_odds({})
        results.append(OddsResponse(
            market_id=market_id,
            yes_odds=round(yes_odds, 2),
            no_odds=round(no_odds, 2),
            confidence=round(confidence, 3),
            updated_at=datetime.utcnow().isoformat()
        ))
    return results

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
