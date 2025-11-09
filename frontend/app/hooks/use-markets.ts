"use client"


import { useQuery, useMutation } from '@apollo/client/react';
import { apolloClient } from "@/app/lib/graphql-client"
import { GET_MARKETS, GET_MARKET, PLACE_BET } from "@/app/lib/queries"

// Import the types from the separate file
import {
  GetMarketsData,
  GetMarketsVariables,
  GetMarketData,
  GetMarketVariables,
  PlaceBetData,
  PlaceBetVariables
} from '@/app/types';



export function useMarkets(limit = 10) {
  const { data, loading, error, refetch } = useQuery<GetMarketsData, GetMarketsVariables>(GET_MARKETS, {
    variables: { limit, offset: 0 },
    client: apolloClient,
  })

  return {
    markets: data?.markets || [],
    loading,
    error,
    refetch,
  }
}


export function useMarket(id: string) {
  const { data, loading, error } = useQuery<GetMarketData, GetMarketVariables>(GET_MARKET, {
    variables: { id },
    client: apolloClient,
    skip: !id,
  })

  return {
    market: data?.market,
    loading,
    error,
  }
}

export function usePlaceBet() {
  const [placeBet, { loading, error }] = useMutation<PlaceBetData, PlaceBetVariables>(PLACE_BET, {
    client: apolloClient,
    refetchQueries: [{ query: GET_MARKETS }],
  })

  return {
    placeBet: async (marketId: string, userId: string, amount: number, prediction: boolean) => {
      const result = await placeBet({
        variables: {
          input: {
            marketId,
            userId,
            amount,
            prediction,
          },
        },
      })
      return result.data?.placeBet
    },
    loading,
    error,
  }
}