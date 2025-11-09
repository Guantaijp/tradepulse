"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Zap, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Header() {
  const pathname = usePathname()

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/learn", label: "Learn More" },
    { href: "/leaderboard", label: "Leaderboard" },
  ]

  return (
    <header className="fixed top-0 w-full z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent">
            <Zap className="w-6 h-6 text-accent-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">TradePulse</h1>
            <p className="text-xs text-muted-foreground">Real-Time Micro Markets</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm transition-colors",
                pathname === link.href ? "text-primary font-semibold" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/connect-wallet">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Wallet className="w-4 h-4" />
              Connect Wallet
            </Button>
          </Link>
          <Link href="/start-trading">
            <Button
              size="sm"
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
            >
              Start Trading
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
