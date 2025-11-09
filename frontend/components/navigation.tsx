"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function Navigation() {
  const pathname = usePathname()

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/learn", label: "Learn More" },
    { href: "/leaderboard", label: "Leaderboard" },
  ]

  return (
    <nav className="flex items-center gap-8">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-cyan-400",
            pathname === link.href ? "text-cyan-400" : "text-gray-400",
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )
}
