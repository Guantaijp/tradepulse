import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "TradePulse - Real-Time Micro Prediction Markets",
    description: "Bet, trade, win in seconds. Real-time prediction markets powered by Linera microchains.",
    generator: "Guantai Strikers",
    icons: {
        icon: [
            {
                url: "/logo.png",
                media: "(prefers-color-scheme: light)",
            },
            {
                url: "/logo.png",
                media: "(prefers-color-scheme: dark)",
            },
            {
                url: "/logo.png",
                type: "image/svg+xml",
            },
        ],
        apple: "/apple-icon.png",
    },
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
        <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
        </body>
        </html>
    )
}
