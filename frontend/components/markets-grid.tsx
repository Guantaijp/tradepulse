"use client"

import { TrendingUp, TrendingDown } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useMarkets } from "@/app/hooks/use-markets"

export function MarketsGrid() {
  const { markets, loading, error } = useMarkets(6)

  if (loading) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(6)].map((_, i) => (
              <Card key={i} className="p-5 bg-card border-border animate-pulse h-64" />
          ))}
        </div>
    )
  }

  if (error) {
    return <div className="text-red-500">Failed to load markets: {error.message}</div>
  }

  return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {markets.map((market: any) => {
          const trending = market.yesOdds > 1.8 ? "up" : "down"
          const change = trending === "up" ? "+12.5%" : "-3.2%"

          return (
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
                  <div className={`flex items-center gap-1 ${trending === "up" ? "text-primary" : "text-destructive"}`}>
                    {trending === "up" ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    <span className="text-xs font-semibold">{change}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Yes Odds</span>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-12 bg-gradient-to-r from-primary to-accent rounded-full"></div>
                      <span className="text-sm font-bold text-primary">{market.yesOdds.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">No Odds</span>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-12 bg-gradient-to-r from-secondary to-primary rounded-full"></div>
                      <span className="text-sm font-bold text-secondary">{market.noOdds.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-xs text-muted-foreground">Volume: {market.totalVolume}</span>
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
          )
        })}
      </div>
  )
}
