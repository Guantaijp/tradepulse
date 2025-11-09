"use client"

import { ArrowRight, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="pt-32 pb-20 px-6 border-b border-border">
      <div className="max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-sm text-primary">⚡ Live, Real-Time Markets</span>
        </div>

        <h2 className="text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-foreground via-primary to-accent">
          Bet. Trade. Win.
        </h2>

        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Experience the future of prediction markets. Place bets on micro-events, trade positions in real-time, and win
          instantly. Powered by Linera microchains for millisecond settlement.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 gap-2"
          >
            Launch App <ArrowRight className="w-5 h-5" />
          </Button>
          <Button size="lg" variant="outline">
            Learn More
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-12 border-t border-border">
          <div>
            <div className="text-2xl font-bold text-accent">0.5s</div>
            <p className="text-sm text-muted-foreground">Settlement Time</p>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">∞</div>
            <p className="text-sm text-muted-foreground">Micro-Markets</p>
          </div>
          <div>
            <div className="text-2xl font-bold text-secondary">100%</div>
            <p className="text-sm text-muted-foreground">On-Chain</p>
          </div>
        </div>
      </div>
    </section>
  )
}
