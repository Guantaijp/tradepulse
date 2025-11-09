"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowRight, Zap, Rocket, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function About() {
  const features = [
    {
      icon: Zap,
      title: "Live Micro-Markets",
      description:
        "Each event creates a short-term prediction market resolving every few minutes or actions (e.g., per round/goal).",
    },
    {
      icon: Rocket,
      title: "Instant Settlement",
      description: "Linera microchains provide immediate finality — no pending transactions or blockchain delays.",
    },
    {
      icon: TrendingUp,
      title: "Dynamic Odds",
      description:
        "AI market makers continuously update odds based on live data, ensuring fair and responsive pricing.",
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="border-b border-gray-800 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold text-white text-balance mb-6">
            The Future of <span className="text-cyan-400">Prediction Markets</span>
          </h1>
          <p className="text-xl text-gray-300 text-balance mb-8">
            TradePulse brings real-time, on-chain prediction markets to life with Web2 speed and Web3 transparency.
          </p>
        </div>
      </section>

      {/* The Problem */}
      <section className="border-b border-gray-800 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-white mb-8">The Problem</h2>
          <div className="space-y-4 text-lg text-gray-300">
            <p>
              Traditional prediction markets (like Polymarket or Augur) are{" "}
              <span className="text-red-400">slow, gas-heavy, and static</span>.
            </p>
            <p>
              Users place a bet, then wait <span className="text-red-400">hours or days</span> for the outcome. There's
              no live interaction, no real-time odds, and no continuous engagement.
            </p>
            <p>The result? Web3 prediction markets feel outdated compared to Web2 betting platforms.</p>
          </div>
        </div>
      </section>

      {/* The Solution */}
      <section className="border-b border-gray-800 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-white mb-8">Our Solution</h2>
          <p className="text-lg text-gray-300 mb-12">
            TradePulse redefines on-chain predictions with real-time, micro-scale markets that resolve within{" "}
            <span className="text-cyan-400">seconds or minutes</span>. Powered by Linera's microchain parallelism, it
            delivers Web2-speed UX and on-chain trust.
          </p>

          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <div
                  key={idx}
                  className="rounded-lg border border-gray-700 bg-gray-900/50 p-6 hover:border-cyan-400/50 transition-colors"
                >
                  <Icon className="h-8 w-8 text-cyan-400 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Linera */}
      <section className="border-b border-gray-800 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-white mb-8">Why Linera?</h2>
          <div className="space-y-4 text-lg text-gray-300">
            <p className="flex gap-3">
              <span className="text-cyan-400 font-bold">→</span>
              <span>
                <span className="font-bold">Parallel Microchains:</span> Each user or event has its own lightweight
                chain, eliminating congestion.
              </span>
            </p>
            <p className="flex gap-3">
              <span className="text-cyan-400 font-bold">→</span>
              <span>
                <span className="font-bold">Instant Finality:</span> Transactions confirm immediately — critical for
                live event markets.
              </span>
            </p>
            <p className="flex gap-3">
              <span className="text-cyan-400 font-bold">→</span>
              <span>
                <span className="font-bold">Predictable Latency:</span> Enables second-by-second market evolution.
              </span>
            </p>
            <p className="flex gap-3">
              <span className="text-cyan-400 font-bold">→</span>
              <span>
                <span className="font-bold">AI Integration:</span> Linera MCP connects AI models directly for adaptive
                market behavior.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="border-b border-gray-800 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-white mb-12">Built With</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="text-cyan-400 font-bold mb-4">Frontend</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Next.js 15 & React 19</li>
                <li>Tailwind CSS & ShadCN</li>
                <li>Framer Motion</li>
                <li>WebSockets</li>
              </ul>
            </div>
            <div>
              <h3 className="text-cyan-400 font-bold mb-4">Smart Contracts</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Rust & Linera SDK</li>
                <li>GraphQL API</li>
                <li>Python & FastAPI</li>
              </ul>
            </div>
            <div>
              <h3 className="text-cyan-400 font-bold mb-4">Infrastructure</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>PostgreSQL & Prisma</li>
                <li>Linera Testnet</li>
                <li>Vercel</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Trade?</h2>
          <p className="text-xl text-gray-400 mb-8">
            Join the revolution of real-time prediction markets powered by Linera.
          </p>
          <Link href="/start-trading">
            <button className="inline-flex items-center gap-2 px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-black font-bold rounded-lg transition-colors">
              Start Trading <ArrowRight className="h-5 w-5" />
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
