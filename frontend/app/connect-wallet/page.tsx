"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Wallet, Copy, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Link from "next/link"

export default function ConnectWallet() {
  const [connected, setConnected] = useState(false)
  const [copied, setCopied] = useState(false)

  const walletAddress = "0x742d35Cc6634C0532925a3b844Bc9e7595f42472"

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const walletOptions = [
    { name: "MetaMask", icon: "🦊" },
    { name: "Coinbase Wallet", icon: "💙" },
    { name: "WalletConnect", icon: "🔵" },
    { name: "Ledger", icon: "💳" },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="border-b border-gray-800 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <Wallet className="h-8 w-8 text-cyan-400" />
            <h1 className="text-4xl font-bold text-white">Connect Your Wallet</h1>
          </div>
          <p className="text-xl text-gray-400">
            Secure your trading account with your Web3 wallet and start predicting.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          {!connected ? (
            <div className="space-y-8">
              {/* Wallet Options */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Choose Your Wallet</h2>
                <div className="grid gap-4">
                  {walletOptions.map((wallet, idx) => (
                    <button
                      key={idx}
                      onClick={() => setConnected(true)}
                      className="flex items-center gap-4 p-4 rounded-lg border border-gray-700 hover:border-cyan-400 hover:bg-gray-900/50 transition-all text-left group"
                    >
                      <span className="text-4xl">{wallet.icon}</span>
                      <span className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
                        {wallet.name}
                      </span>
                      <span className="ml-auto text-gray-500 group-hover:text-cyan-400">→</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Info */}
              <div className="rounded-lg border border-blue-700/50 bg-blue-900/20 p-4">
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-300">
                    Make sure you're on the Linera Testnet (Conway) network in your wallet before connecting.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Connected State */}
              <div className="rounded-lg border border-green-700/50 bg-green-900/20 p-6">
                <div className="flex gap-4">
                  <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-green-400 mb-2">Wallet Connected!</h3>
                    <p className="text-gray-300">Your wallet is now linked to TradePulse.</p>
                  </div>
                </div>
              </div>

              {/* Wallet Details */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4">Connected Account</h3>
                <div className="rounded-lg border border-gray-700 bg-gray-900/50 p-4">
                  <div className="flex items-center justify-between">
                    <code className="text-cyan-400 font-mono">{walletAddress}</code>
                    <button
                      onClick={handleCopyAddress}
                      className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-800 transition-colors"
                    >
                      <Copy className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-400">{copied ? "Copied!" : "Copy"}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Balance */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4">Balance</h3>
                <div className="rounded-lg border border-gray-700 bg-gray-900/50 p-4">
                  <p className="text-sm text-gray-400 mb-2">Available USDC (Testnet)</p>
                  <p className="text-3xl font-bold text-cyan-400">1,000 USDC</p>
                </div>
              </div>

              {/* Next Steps */}
              <div className="rounded-lg border border-gray-700 bg-gray-900/50 p-6">
                <h3 className="text-lg font-bold text-white mb-4">What's Next?</h3>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <span className="text-cyan-400 font-bold">1.</span>
                    <span className="text-gray-300">Review live markets and find predictions you believe in</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-cyan-400 font-bold">2.</span>
                    <span className="text-gray-300">Place your first bet with your testnet USDC</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-cyan-400 font-bold">3.</span>
                    <span className="text-gray-300">Watch the market evolve in real-time as odds shift</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-cyan-400 font-bold">4.</span>
                    <span className="text-gray-300">Settle instantly and check the leaderboard</span>
                  </li>
                </ul>
              </div>

              {/* CTA */}
              <div className="flex gap-4">
                <Link href="/start-trading" className="flex-1">
                  <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-3">
                    Start Trading
                  </Button>
                </Link>
                <button
                  onClick={() => setConnected(false)}
                  className="px-6 py-3 rounded-lg border border-gray-700 text-white hover:border-gray-600 transition-colors"
                >
                  Disconnect
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
