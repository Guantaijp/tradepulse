import { NextResponse } from "next/server"

const GRAPHQL_API = process.env.NEXT_PUBLIC_GRAPHQL_API || "http://localhost:4000/graphql"
const ODDS_ENGINE_API = process.env.ODDS_ENGINE_API || "http://localhost:8000"

export async function GET() {
  try {
    const query = `
      query {
        markets(limit: 10) {
          id
          title
          description
          category
          yesOdds
          noOdds
          totalVolume
          status
        }
      }
    `

    const response = await fetch(GRAPHQL_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    })

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch markets" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const mutation = `
      mutation {
        createMarket(input: {
          title: "${body.title}"
          description: "${body.description}"
          category: "${body.category}"
          resolutionDate: "${body.resolutionDate}"
        }) {
          id
          title
          status
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
    return NextResponse.json({ error: "Failed to create market" }, { status: 500 })
  }
}
