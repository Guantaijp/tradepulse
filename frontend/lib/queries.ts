import { gql } from "@apollo/client"

export const GET_MARKETS = gql`
  query GetMarkets($status: String, $limit: Int, $offset: Int) {
    markets(status: $status, limit: $limit, offset: $offset) {
      id
      title
      description
      category
      yesOdds
      noOdds
      totalVolume
      status
      resolutionDate
    }
  }
`

export const GET_MARKET = gql`
  query GetMarket($id: ID!) {
    market(id: $id) {
      id
      title
      description
      category
      yesOdds
      noOdds
      totalVolume
      status
      resolutionDate
      bets {
        id
        amount
        odds
        prediction
        status
      }
    }
  }
`

export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      username
      email
      balance
      totalBets
      winRate
      totalPnL
    }
  }
`

export const GET_USER_BETS = gql`
  query GetUserBets($userId: ID!, $limit: Int) {
    userBets(userId: $userId, limit: $limit) {
      id
      marketId
      amount
      prediction
      odds
      potentialPayout
      status
      createdAt
    }
  }
`

export const GET_LEADERBOARD = gql`
  query GetLeaderboard($limit: Int) {
    leaderboard(limit: $limit) {
      rank
      userId
      username
      pnl
      winRate
      totalBets
    }
  }
`

export const GET_MARKET_ODDS = gql`
  query GetMarketOdds($marketId: ID!) {
    marketOdds(marketId: $marketId) {
      id
      yesOdds
      noOdds
      confidence
      timestamp
    }
  }
`

export const PLACE_BET = gql`
  mutation PlaceBet($input: PlaceBetInput!) {
    placeBet(input: $input) {
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

export const CREATE_MARKET = gql`
  mutation CreateMarket($input: CreateMarketInput!) {
    createMarket(input: $input) {
      id
      title
      description
      status
      yesOdds
      noOdds
    }
  }
`

export const RESOLVE_MARKET = gql`
  mutation ResolveMarket($marketId: ID!, $outcome: Boolean!) {
    resolveMarket(marketId: $marketId, outcome: $outcome) {
      id
      status
      outcome
    }
  }
`
