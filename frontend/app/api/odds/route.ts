import { NextResponse } from "next/server"

const ODDS_ENGINE_API = process.env.ODDS_ENGINE_API || "http://localhost:8000"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const response = await fetch(`${ODDS_ENGINE_API}/api/odds/calculate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: "Failed to calculate odds" }, { status: 500 })
  }
}
