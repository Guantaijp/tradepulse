import { NextResponse } from "next/server"

const GRAPHQL_API = process.env.NEXT_PUBLIC_GRAPHQL_API || "http://localhost:4000/graphql"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const mutation = `
      mutation {
        placeBet(input: {
          marketId: "${body.marketId}"
          userId: "${body.userId}"
          amount: ${body.amount}
          prediction: ${body.prediction}
        }) {
          success
          bet {
            id
            amount
            odds
            potentialPayout
            status
          }
          message
        }
      }
    `

    const response = await fetch(GRAPHQL_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: mutation }),
    })

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: "Failed to place bet" }, { status: 500 })
  }
}
