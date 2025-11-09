"use client"

import { useMarkets } from "@/app/hooks/use-markets"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export function MarketsList() {
  const { markets, loading, error } = useMarkets(6)

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
      </div>
    )
  }

  if (error) {
    return <div className="text-red-500">Failed to load markets: {error.message}</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {markets.map((market: any) => (
        <Card
          key={market.id}
          className="bg-slate-900 border-slate-800 hover:border-cyan-500/50 transition-colors cursor-pointer"
        >
          <CardHeader>
            <CardTitle className="text-base text-white">{market.title}</CardTitle>
            <CardDescription>{market.category}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-slate-400">YES</span>
                <span className="text-sm font-semibold text-cyan-400">{market.yesOdds.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-400">NO</span>
                <span className="text-sm font-semibold text-purple-400">{market.noOdds.toFixed(2)}</span>
              </div>
              <div className="text-xs text-slate-500">Volume: ${(market.totalVolume / 1000).toFixed(1)}k</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
