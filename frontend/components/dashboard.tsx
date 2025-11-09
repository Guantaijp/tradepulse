"use client"

import { MarketsGrid } from "./markets-grid"
import { Leaderboard } from "./leaderboard"
import { TradingPanel } from "./trading-panel"

export function Dashboard() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Markets Grid */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2">Live Markets</h3>
              <p className="text-muted-foreground">New market every minute • AI-driven odds</p>
            </div>
            <MarketsGrid />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <TradingPanel />
            <Leaderboard />
          </div>
        </div>
      </div>
    </section>
  )
}
