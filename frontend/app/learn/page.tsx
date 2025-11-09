"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowRight, BookOpen, Lightbulb, Users } from "lucide-react"
import Link from "next/link"

export default function Learn() {
  const sections = [
    {
      icon: BookOpen,
      title: "How Prediction Markets Work",
      content: [
        "Prediction markets allow users to buy and sell 'shares' in potential outcomes of events.",
        "The price of each share reflects the market's probability of that outcome occurring.",
        "When the event resolves, correct predictions are rewarded with payouts based on final odds.",
        "TradePulse extends this model with real-time micro-events and instant settlement on Linera.",
      ],
    },
    {
      icon: Lightbulb,
      title: "Understanding Micro-Markets",
      content: [
        "Micro-markets are short-duration prediction markets that resolve within minutes or seconds.",
        "Examples: 'Next goal in the match', 'Next kill in esports tournament', 'Next tweet likes over 1K'.",
        "Small bet sizes + high frequency = constant engagement and learning opportunities.",
        "AI agents continuously adjust odds, creating dynamic trading opportunities for sharp traders.",
      ],
    },
    {
      icon: Users,
      title: "Getting Started",
      content: [
        "1. Connect your Web3 wallet to TradePulse",
        "2. Deposit USDC testnet tokens",
        "3. Browse active markets and place your first prediction",
        "4. Watch live odds update in real-time as the event unfolds",
        "5. Settle instantly and claim your winnings",
      ],
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="border-b border-gray-800 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold text-white text-balance mb-6">
            Learn About <span className="text-cyan-400">Real-Time Prediction Markets</span>
          </h1>
          <p className="text-xl text-gray-300">
            Understand how TradePulse combines Linera's speed with AI-driven odds for the ultimate prediction market
            experience.
          </p>
        </div>
      </section>

      {/* Learning Sections */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-16">
          {sections.map((section, idx) => {
            const Icon = section.icon
            return (
              <div key={idx} className="border-b border-gray-800 pb-12 last:border-0">
                <div className="flex gap-4 mb-6">
                  <Icon className="h-8 w-8 text-cyan-400 flex-shrink-0" />
                  <h2 className="text-2xl font-bold text-white">{section.title}</h2>
                </div>
                <ul className="space-y-3">
                  {section.content.map((item, i) => (
                    <li key={i} className="text-gray-300 flex gap-3">
                      <span className="text-cyan-400 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </section>

      {/* FAQ-style */}
      <section className="border-t border-gray-800 px-4 py-16 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-white mb-12">Common Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-cyan-400 mb-2">What's the minimum bet on TradePulse?</h3>
              <p className="text-gray-300">
                There is no minimum on most markets, but some may have minimums set by the market creator. Check
                individual market details.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-cyan-400 mb-2">How fast do markets settle?</h3>
              <p className="text-gray-300">
                Markets settle instantly on Linera's microchains once the event outcome is confirmed. Most markets
                resolve within seconds to minutes.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-cyan-400 mb-2">Is my prediction private?</h3>
              <p className="text-gray-300">
                All predictions are recorded on-chain, so they're transparent and immutable. Your wallet address is
                public, but predictions are pseudonymous.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-cyan-400 mb-2">How are odds calculated?</h3>
              <p className="text-gray-300">
                Odds are set by AI market makers analyzing real-time event data. They adjust dynamically as more traders
                participate and live events unfold.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Start?</h2>
          <p className="text-xl text-gray-400 mb-8">You now understand how TradePulse works. Let's get you trading.</p>
          <Link href="/connect-wallet">
            <button className="inline-flex items-center gap-2 px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-black font-bold rounded-lg transition-colors">
              Connect Your Wallet <ArrowRight className="h-5 w-5" />
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
