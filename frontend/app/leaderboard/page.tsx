"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Trophy, TrendingUp, Users } from "lucide-react"
import { useLeaderboard } from "@/app/hooks/use-user"

export default function Leaderboard() {
  const { leaderboard, loading, error } = useLeaderboard(10)

  const stats = [
    { icon: Trophy, label: "Total Trades", value: "2.4M+" },
    { icon: Users, label: "Active Traders", value: "48.2K" },
    { icon: TrendingUp, label: "Total Volume", value: "$156.8M" },
  ]

  if (loading) {
    return (
        <main className="min-h-screen bg-gray-950">
          <Header />
          <div className="border-b border-gray-800 px-4 py-16">
            <h1 className="text-4xl font-bold text-white">Loading leaderboard...</h1>
          </div>
          <Footer />
        </main>
    )
  }

  if (error) {
    return (
        <main className="min-h-screen bg-gray-950">
          <Header />
          <div className="border-b border-gray-800 px-4 py-16">
            <h1 className="text-4xl font-bold text-red-400">Error loading leaderboard</h1>
            <p className="text-gray-400 mt-2">{error.message}</p>
          </div>
          <Footer />
        </main>
    )
  }

  return (
      <main className="min-h-screen bg-gray-950">
        <Header />
        {/* Hero */}
        <section className="border-b border-gray-800 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="flex items-center gap-3 mb-4">
              <Trophy className="h-8 w-8 text-yellow-400" />
              <h1 className="text-4xl font-bold text-white">TradePulse Leaderboard</h1>
            </div>
            <p className="text-xl text-gray-400">Top traders ranked by P&L, accuracy, and total bets.</p>
          </div>
        </section>

        {/* Stats */}
        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 md:grid-cols-3">
              {stats.map((stat, idx) => {
                const Icon = stat.icon
                return (
                    <div key={idx} className="rounded-lg border border-gray-700 bg-gray-900/50 p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
                          <p className="text-3xl font-bold text-white">{stat.value}</p>
                        </div>
                        <Icon className="h-8 w-8 text-cyan-400 opacity-50" />
                      </div>
                    </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Table */}
        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="overflow-x-auto rounded-lg border border-gray-700">
              <table className="w-full">
                <thead>
                <tr className="border-b border-gray-700 bg-gray-900/50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Rank</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Trader</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">P&L</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">Win Rate</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">Total Bets</th>
                </tr>
                </thead>
                <tbody>
                {leaderboard.map((trader, idx) => (
                    <tr
                        key={trader.userId}
                        className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className="text-lg font-bold text-cyan-400">#{trader.rank}</span>
                      </td>
                      <td className="px-6 py-4">
                        <code className="text-cyan-400 font-mono text-sm">{trader.username}</code>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className={`font-semibold ${trader.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          ${trader.pnl.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-green-400 font-semibold">
                          {(trader.winRate * 100).toFixed(1)}%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-white font-semibold">
                        {trader.totalBets}
                      </td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Info */}
        <section className="border-t border-gray-800 px-4 py-12 sm:px-6 lg:px-8 bg-gray-900/30">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl font-bold text-white mb-6">How Rankings Work</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-lg font-bold text-cyan-400 mb-3">P&L (Profit & Loss)</h3>
                <p className="text-gray-400">Total profit or loss across all trades. Higher is better.</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-cyan-400 mb-3">Win Rate</h3>
                <p className="text-gray-400">Percentage of predictions that were correct. Higher accuracy means better performance.</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-cyan-400 mb-3">Total Bets</h3>
                <p className="text-gray-400">Total number of predictions and trades placed by the trader.</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-cyan-400 mb-3">Real-Time Updates</h3>
                <p className="text-gray-400">Leaderboard ranks update instantly as markets settle on Linera.</p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
  )
}