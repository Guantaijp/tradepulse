"use client"

import { TrendingUp, TrendingDown } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const MARKETS = [
  {
    id: 1,
    title: "Next Goal in Liverpool vs Man City",
    category: "Sports",
    odds: { yes: 1.75, no: 2.15 },
    volume: "$245,320",
    timeLeft: "2m 14s",
    trending: "up",
    change: "+12.5%",
  },
  {
    id: 2,
    title: "Will Bitcoin Hit $100k Today?",
    category: "Crypto",
    odds: { yes: 1.92, no: 1.95 },
    volume: "$1.2M",
    timeLeft: "4h 22m",
    trending: "up",
    change: "+8.3%",
  },
  {
    id: 3,
    title: "Next Round - Team Red Wins",
    category: "eSports",
    odds: { yes: 2.05, no: 1.82 },
    volume: "$567,890",
    timeLeft: "45s",
    trending: "down",
    change: "-3.2%",
  },
  {
    id: 4,
    title: "Stock Market Green by Close",
    category: "Markets",
    odds: { yes: 1.65, no: 2.35 },
    volume: "$3.4M",
    timeLeft: "1h 12m",
    trending: "up",
    change: "+15.1%",
  },
  {
    id: 5,
    title: "AI Sentiment Score > 75",
    category: "AI",
    odds: { yes: 2.12, no: 1.78 },
    volume: "$892,120",
    timeLeft: "3m 5s",
    trending: "up",
    change: "+6.7%",
  },
  {
    id: 6,
    title: "Election: Candidate A Leads",
    category: "Politics",
    odds: { yes: 1.88, no: 2.02 },
    volume: "$2.1M",
    timeLeft: "2h 45m",
    trending: "down",
    change: "-2.1%",
  },
]

export function MarketsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {MARKETS.map((market) => (
        <Card
          key={market.id}
          className="p-5 bg-card border-border hover:border-primary/30 transition-all cursor-pointer group"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">{market.category}</span>
                <span className="text-xs text-muted-foreground">⏱ {market.timeLeft}</span>
              </div>
              <h4 className="text-sm font-semibold text-foreground group-hover:text-accent transition">
                {market.title}
              </h4>
            </div>
            <div
              className={`flex items-center gap-1 ${market.trending === "up" ? "text-primary" : "text-destructive"}`}
            >
              {market.trending === "up" ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span className="text-xs font-semibold">{market.change}</span>
            </div>
          </div>

          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Yes Odds</span>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-12 bg-gradient-to-r from-primary to-accent rounded-full"></div>
                <span className="text-sm font-bold text-primary">{market.odds.yes.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">No Odds</span>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-12 bg-gradient-to-r from-secondary to-primary rounded-full"></div>
                <span className="text-sm font-bold text-secondary">{market.odds.no.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <span className="text-xs text-muted-foreground">Volume: {market.volume}</span>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="text-xs bg-transparent">
                No
              </Button>
              <Button size="sm" className="text-xs bg-primary hover:bg-primary/90">
                Yes
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
