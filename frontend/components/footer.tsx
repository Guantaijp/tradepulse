"use client"

import Link from "next/link"
import { Github, Twitter, Mail, Zap } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-950 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-4 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Zap className="h-6 w-6 text-cyan-400" />
              <span className="font-bold text-white">TradePulse</span>
            </div>
            <p className="text-sm text-gray-400">Real-time prediction markets powered by Linera.</p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-bold text-white mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/learn" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">
                  Learn
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link href="/start-trading" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">
                  Start Trading
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/Guantaijp/tradepulse"
                  className="text-sm text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://linera.io" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">
                  Linera
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-bold text-white mb-4">Follow</h3>
            <div className="flex gap-3">
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">© 2025 TradePulse. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">
              Privacy
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">
              Terms
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
