"use client"

import { useState } from "react"
import { ArrowUpRight, ArrowDownLeft } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function TradingPanel() {
  const [amount, setAmount] = useState("100")
  const [side, setSide] = useState<"yes" | "no">("yes")

  return (
    <Card className="p-6 bg-card border-border">
      <h3 className="text-lg font-bold mb-4">Quick Trade</h3>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setSide("yes")}
            className={`p-3 rounded-lg border transition ${
              side === "yes" ? "bg-primary/20 border-primary" : "bg-card border-border hover:border-primary/50"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <ArrowUpRight className="w-4 h-4" />
              <span className="text-sm font-semibold">YES</span>
            </div>
          </button>
          <button
            onClick={() => setSide("no")}
            className={`p-3 rounded-lg border transition ${
              side === "no" ? "bg-secondary/20 border-secondary" : "bg-card border-border hover:border-secondary/50"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <ArrowDownLeft className="w-4 h-4" />
              <span className="text-sm font-semibold">NO</span>
            </div>
          </button>
        </div>

        <div>
          <label className="text-xs text-muted-foreground block mb-2">Amount (USDC)</label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-input border-border text-foreground"
            placeholder="0.00"
          />
        </div>

        <div className="bg-muted/30 p-3 rounded-lg space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Payout:</span>
            <span className="text-foreground font-semibold">${(Number(amount) * 1.75).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Fee:</span>
            <span className="text-foreground font-semibold">${(Number(amount) * 0.02).toFixed(2)}</span>
          </div>
        </div>

        <Button className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
          Place Bet
        </Button>

        <Button variant="outline" className="w-full bg-transparent">
          Connect Wallet
        </Button>
      </div>
    </Card>
  )
}
