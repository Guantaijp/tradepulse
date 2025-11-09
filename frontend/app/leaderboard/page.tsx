"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Trophy, TrendingUp, Users } from "lucide-react"

export default function Leaderboard() {
  // Mock data
  const topTraders = [
    { rank: 1, name: "0x8f4D...", wins: 248, winRate: 68.5, volume: "$124,500", badge: "🏆" },
    { rank: 2, name: "0xA2bC...", wins: 201, winRate: 64.2, volume: "$98,300", badge: "🥈" },
    { rank: 3, name: "0x5eE9...", wins: 189, winRate: 62.1, volume: "$87,600", badge: "🥉" },
    { rank: 4, name: "0xFf12...", wins: 156, winRate: 59.8, volume: "$76,400", badge: "4" },
    { rank: 5, name: "0x3dB1...", wins: 142, winRate: 58.3, volume: "$65,200", badge: "5" },
    { rank: 6, name: "0x9Cc4...", wins: 128, winRate: 55.9, volume: "$54,100", badge: "6" },
    { rank: 7, name: "0xEe22...", wins: 115, winRate: 53.2, volume: "$48,900", badge: "7" },
    { rank: 8, name: "0x4f6A...", wins: 102, winRate: 51.5, volume: "$42,300", badge: "8" },
    { rank: 9, name: "0xBb88...", wins: 89, winRate: 49.8, volume: "$38,500", badge: "9" },
    { rank: 10, name: "0x2c33...", wins: 76, winRate: 47.6, volume: "$31,200", badge: "10" },
  ]

  const stats = [
    { icon: Trophy, label: "Total Trades", value: "2.4M+" },
    { icon: Users, label: "Active Traders", value: "48.2K" },
    { icon: TrendingUp, label: "Total Volume", value: "$156.8M" },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="border-b border-gray-800 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="h-8 w-8 text-yellow-400" />
            <h1 className="text-4xl font-bold text-white">TradePulse Leaderboard</h1>
          </div>
          <p className="text-xl text-gray-400">Top traders ranked by accuracy, volume, and win rate.</p>
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
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">Wins</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">Win Rate</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">Total Volume</th>
                </tr>
              </thead>
              <tbody>
                {topTraders.map((trader, idx) => (
                  <tr key={idx} className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-2xl">{trader.badge}</span>
                    </td>
                    <td className="px-6 py-4">
                      <code className="text-cyan-400 font-mono text-sm">{trader.name}</code>
                    </td>
                    <td className="px-6 py-4 text-right text-white font-semibold">{trader.wins}</td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-green-400 font-semibold">{trader.winRate}%</span>
                    </td>
                    <td className="px-6 py-4 text-right text-white font-semibold">{trader.volume}</td>
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
              <h3 className="text-lg font-bold text-cyan-400 mb-3">Win Rate</h3>
              <p className="text-gray-400">Percentage of predictions that were correct. Higher is better.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-cyan-400 mb-3">Total Volume</h3>
              <p className="text-gray-400">Total USDC traded across all your positions and markets.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-cyan-400 mb-3">Win Count</h3>
              <p className="text-gray-400">Total number of correct predictions and profitable trades.</p>
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
