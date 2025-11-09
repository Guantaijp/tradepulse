"use client"

import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { Dashboard } from "@/components/dashboard"

export default function Home() {
  return (
      <main className="min-h-screen bg-background">
        <Header />
        <HeroSection />
        <Dashboard />
      </main>
  )
}
