"use client"

import { Trophy, Target } from "lucide-react"
import { Card } from "@/components/ui/card"

const LEADERBOARD = [
  { rank: 1, name: "CryptoKing", winrate: 78, profit: "+$12,420" },
  { rank: 2, name: "TradeWizard", winrate: 72, profit: "+$8,950" },
  { rank: 3, name: "PulseBeater", winrate: 68, profit: "+$6,340" },
  { rank: 4, name: "OddsBreaker", winrate: 65, profit: "+$4,120" },
  { rank: 5, name: "FlowMaster", winrate: 62, profit: "+$2,890" },
]

export function Leaderboard() {
  return (
    <Card className="p-6 bg-card border-border">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <Trophy className="w-5 h-5 text-accent" />
        Top Traders
      </h3>

      <div className="space-y-3">
        {LEADERBOARD.map((trader, idx) => (
          <div
            key={trader.rank}
            className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg hover:bg-muted/40 transition"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent text-accent-foreground text-xs font-bold">
              {trader.rank}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">{trader.name}</p>
              <p className="text-xs text-muted-foreground">{trader.winrate}% win rate</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-primary">{trader.profit}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20">
        <div className="flex items-center gap-2 mb-2">
          <Target className="w-4 h-4 text-accent" />
          <span className="text-xs font-semibold text-foreground">Your Stats</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <p className="text-muted-foreground">Win Rate</p>
            <p className="font-bold text-primary">0%</p>
          </div>
          <div>
            <p className="text-muted-foreground">P&L</p>
            <p className="font-bold text-accent">$0.00</p>
          </div>
        </div>
      </div>
    </Card>
  )
}
