"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TrendingUp, Zap, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TradingModal } from "@/components/trading-modal"

export default function StartTrading() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedMarket, setSelectedMarket] = useState<any>(null)

  const markets = [
    {
      title: "Will Bitcoin close above $45K today?",
      category: "Crypto",
      resolveTime: "In 8 hours",
      yes: 62,
      no: 38,
      volume: "$125,400",
    },
    {
      title: "Next Team Ace in Pro Match",
      category: "Esports",
      resolveTime: "LIVE",
      yes: 71,
      no: 29,
      volume: "$89,300",
    },
    {
      title: "Will Tesla stock rise tomorrow?",
      category: "Markets",
      resolveTime: "In 24 hours",
      yes: 45,
      no: 55,
      volume: "$203,500",
    },
    {
      title: "Next Goal in Champions League",
      category: "Sports",
      resolveTime: "LIVE",
      yes: 58,
      no: 42,
      volume: "$156,200",
    },
    {
      title: "Will Ethereum hit $3K this week?",
      category: "Crypto",
      resolveTime: "In 6 days",
      yes: 38,
      no: 62,
      volume: "$198,700",
    },
    {
      title: "Will a celebrity announce a new project?",
      category: "Entertainment",
      resolveTime: "In 2 hours",
      yes: 42,
      no: 58,
      volume: "$45,600",
    },
  ]

  const handleTradeClick = (market: any) => {
    setSelectedMarket(market)
    setIsModalOpen(true)
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="border-b border-gray-800 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="h-8 w-8 text-cyan-400" />
            <h1 className="text-4xl font-bold text-white">Start Trading</h1>
          </div>
          <p className="text-xl text-gray-400">
            Pick a market, place your bet, and watch the odds evolve in real-time.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-gray-800 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex gap-3 flex-wrap">
            {["All", "Crypto", "Sports", "Esports", "Markets", "Entertainment"].map((tag, idx) => (
              <button
                key={idx}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  idx === 0
                    ? "bg-cyan-500/20 text-cyan-400 border border-cyan-400"
                    : "border border-gray-700 text-gray-400 hover:border-gray-600"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Markets Grid */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {markets.map((market, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-gray-700 bg-gray-900/50 p-6 hover:border-cyan-400/50 transition-colors group"
              >
                <div className="mb-4">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-300">{market.category}</span>
                    {market.resolveTime === "LIVE" && (
                      <span className="flex items-center gap-1 text-xs text-red-400">
                        <Zap className="h-3 w-3" /> LIVE
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {market.title}
                  </h3>
                </div>

                {/* Odds */}
                <div className="mb-4 space-y-2">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-400">YES</span>
                      <span className="text-sm font-bold text-green-400">{market.yes}%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500" style={{ width: `${market.yes}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-400">NO</span>
                      <span className="text-sm font-bold text-red-400">{market.no}%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500" style={{ width: `${market.no}%` }} />
                    </div>
                  </div>
                </div>

                {/* Meta */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {market.resolveTime}
                  </span>
                  <span>{market.volume} volume</span>
                </div>

                <Button
                  onClick={() => handleTradeClick(market)}
                  className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-bold"
                >
                  Trade Now
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="border-t border-gray-800 px-4 py-16 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold text-white mb-8">How to Trade</h2>
          <div className="grid gap-8 md:grid-cols-4">
            {[
              { num: "1", title: "Connect", desc: "Link your Web3 wallet" },
              { num: "2", title: "Choose", desc: "Pick a market you believe in" },
              { num: "3", title: "Bet", desc: "Place your YES or NO prediction" },
              { num: "4", title: "Settle", desc: "Instant settlement when market resolves" },
            ].map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="w-12 h-12 rounded-full bg-cyan-500 text-black text-lg font-bold flex items-center justify-center mx-auto mb-3">
                  {step.num}
                </div>
                <h3 className="font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-gray-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedMarket && (
        <TradingModal market={selectedMarket} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}

      <Footer />
    </main>
  )
}
