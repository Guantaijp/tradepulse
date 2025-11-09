"use client"

import { useState } from "react"
import { X, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface TradingModalProps {
  market: {
    title: string
    category: string
    yes: number
    no: number
    resolveTime: string
    volume: string
  }
  isOpen: boolean
  onClose: () => void
}

export function TradingModal({ market, isOpen, onClose }: TradingModalProps) {
  const [selectedOutcome, setSelectedOutcome] = useState<"yes" | "no" | null>(null)
  const [betAmount, setBetAmount] = useState("")
  const [step, setStep] = useState<"choose" | "amount" | "confirm" | "success">("choose")

  const yesOdds = (100 / market.yes).toFixed(2)
  const noOdds = (100 / market.no).toFixed(2)
  const selectedOdds = selectedOutcome === "yes" ? yesOdds : noOdds
  const potentialPayout = betAmount ? (Number(betAmount) * Number(selectedOdds)).toFixed(2) : "0.00"
  const profit = betAmount ? (Number(potentialPayout) - Number(betAmount)).toFixed(2) : "0.00"

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-lg max-w-md w-full shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Place Your Bet</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Market Info */}
          <div className="mb-6">
            <p className="text-sm text-gray-400 mb-2">Market</p>
            <h3 className="text-lg font-bold text-white">{market.title}</h3>
            <p className="text-xs text-gray-500 mt-2">
              {market.category} • {market.resolveTime}
            </p>
          </div>

          {/* Step 1: Choose Outcome */}
          {step === "choose" && (
            <>
              <p className="text-sm text-gray-400 mb-4">Choose your prediction</p>
              <div className="space-y-3 mb-6">
                <button
                  onClick={() => {
                    setSelectedOutcome("yes")
                    setStep("amount")
                  }}
                  className="w-full p-4 rounded-lg border-2 border-green-500/30 hover:border-green-500 hover:bg-green-500/10 transition-all text-left"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-green-400">YES</p>
                      <p className="text-xs text-gray-400">Market probability: {market.yes}%</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-400">{yesOdds}x</p>
                      <p className="text-xs text-gray-400">payout</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setSelectedOutcome("no")
                    setStep("amount")
                  }}
                  className="w-full p-4 rounded-lg border-2 border-red-500/30 hover:border-red-500 hover:bg-red-500/10 transition-all text-left"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-red-400">NO</p>
                      <p className="text-xs text-gray-400">Market probability: {market.no}%</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-red-400">{noOdds}x</p>
                      <p className="text-xs text-gray-400">payout</p>
                    </div>
                  </div>
                </button>
              </div>
            </>
          )}

          {/* Step 2: Enter Amount */}
          {step === "amount" && (
            <>
              <p className="text-sm text-gray-400 mb-4">Enter your bet amount ({selectedOutcome?.toUpperCase()})</p>
              <div className="mb-6">
                <div className="relative mb-4">
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={betAmount}
                    onChange={(e) => setBetAmount(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-600 text-lg font-bold pl-4 pr-12"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">USD</span>
                </div>

                {/* Quick amounts */}
                <div className="flex gap-2 mb-4">
                  {[10, 25, 50, 100].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setBetAmount(amount.toString())}
                      className="flex-1 px-3 py-2 rounded border border-gray-700 hover:border-cyan-400 hover:bg-cyan-400/10 text-xs text-gray-400 hover:text-cyan-400 transition-colors"
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
              </div>

              {/* Payout Preview */}
              {betAmount && (
                <div className="mb-6 p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Bet Amount:</span>
                    <span className="font-bold text-white">${betAmount}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Odds:</span>
                    <span className="font-bold text-cyan-400">{selectedOdds}x</span>
                  </div>
                  <div className="border-t border-cyan-500/20 pt-2 flex justify-between">
                    <span className="text-gray-400">Potential Payout:</span>
                    <span className="font-bold text-cyan-400">${potentialPayout}</span>
                  </div>
                  <div className="flex justify-between text-sm text-green-400">
                    <span>Your Profit:</span>
                    <span>+${profit}</span>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <Button onClick={() => setStep("choose")} variant="outline" className="flex-1">
                  Back
                </Button>
                <Button
                  onClick={() => setStep("confirm")}
                  disabled={!betAmount || Number(betAmount) <= 0}
                  className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-black font-bold"
                >
                  Review
                </Button>
              </div>
            </>
          )}

          {/* Step 3: Confirm */}
          {step === "confirm" && (
            <>
              <div className="mb-6 p-4 rounded-lg bg-gray-800 border border-gray-700 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Prediction:</span>
                  <span className="font-bold text-white uppercase">{selectedOutcome}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Bet Amount:</span>
                  <span className="font-bold text-white">${betAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Odds:</span>
                  <span className="font-bold text-cyan-400">{selectedOdds}x</span>
                </div>
                <div className="border-t border-gray-700 pt-3 flex justify-between">
                  <span className="text-gray-400">Potential Win:</span>
                  <span className="font-bold text-green-400">${potentialPayout}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button onClick={() => setStep("amount")} variant="outline" className="flex-1">
                  Back
                </Button>
                <Button
                  onClick={() => setStep("success")}
                  className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-black font-bold"
                >
                  Confirm Bet
                </Button>
              </div>
            </>
          )}

          {/* Step 4: Success */}
          {step === "success" && (
            <>
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-400 mx-auto mb-4 flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Bet Placed!</h3>
                <p className="text-gray-400 text-sm">Your prediction is live on the market</p>
              </div>

              <div className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                <p className="text-sm text-gray-400 mb-1">You predicted</p>
                <p className="text-2xl font-bold text-green-400 mb-3">
                  {selectedOutcome?.toUpperCase()} ${betAmount}
                </p>
                <p className="text-xs text-gray-400">Market resolves: {market.resolveTime}</p>
              </div>

              <Button onClick={onClose} className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-bold">
                Done
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
