"use client"

import { Trophy, Target } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useLeaderboard } from "@/app/hooks/use-user"

export function Leaderboard() {
    const { leaderboard, loading, error } = useLeaderboard(5)

    if (loading) {
        return (
            <Card className="p-6 bg-card border-border">
                <div className="space-y-3 animate-pulse">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-12 bg-muted rounded-lg" />
                    ))}
                </div>
            </Card>
        )
    }

    if (error) {
        return (
            <Card className="p-6 bg-card border-border">
                <p className="text-red-500 text-sm">Failed to load leaderboard</p>
            </Card>
        )
    }

    return (
        <Card className="p-6 bg-card border-border">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-accent" />
                Top Traders
            </h3>

            <div className="space-y-3">
                {leaderboard.map((trader: any, idx: number) => (
                    <div
                        key={trader.userId}
                        className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg hover:bg-muted/40 transition"
                    >
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent text-accent-foreground text-xs font-bold">
                            {trader.rank}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-foreground truncate">
                                {trader.username}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                {(trader.winRate * 100).toFixed(1)}% win rate • {trader.totalBets} bets
                            </p>
                        </div>
                        <div className="text-right">
                            <p className={`text-xs font-bold ${trader.pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                ${trader.pnl.toLocaleString()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4 text-accent" />
                    <span className="text-xs font-semibold text-foreground">Your Stats</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                        <p className="text-muted-foreground">Win Rate</p>
                        <p className="font-bold text-primary">0%</p>
                    </div>
                    <div>
                        <p className="text-muted-foreground">P&L</p>
                        <p className="font-bold text-accent">$0.00</p>
                    </div>
                </div>
            </div>
        </Card>
    )
}