"use client"

import { useQuery, } from '@apollo/client/react';
import { apolloClient } from "@/app/lib/graphql-client"
import { GET_USER, GET_USER_BETS, GET_LEADERBOARD } from "@/app/lib/queries"


import {
  GetUserData,
  GetUserVariables,
  GetUserBetsData,
  GetUserBetsVariables,
  GetLeaderboardData,
  GetLeaderboardVariables
} from '@/app/types';

export function useUser(userId: string) {
  // Pass the types to the useQuery hook
  const { data, loading, error } = useQuery<GetUserData, GetUserVariables>(GET_USER, {
    variables: { id: userId },
    client: apolloClient,
    skip: !userId,
  })

  return {
    user: data?.user,
    loading,
    error,
  }
}


export function useUserBets(userId: string, limit = 10) {
  // Pass the types to the useQuery hook
  const { data, loading, error } = useQuery<GetUserBetsData, GetUserBetsVariables>(GET_USER_BETS, {
    variables: { userId, limit },
    client: apolloClient,
    skip: !userId,
  })

  return {
    bets: data?.userBets || [],
    loading,
    error,
  }
}


export function useLeaderboard(limit = 10) {
  // Pass the types to the useQuery hook
  const { data, loading, error, refetch } = useQuery<GetLeaderboardData, GetLeaderboardVariables>(GET_LEADERBOARD, {
    variables: { limit },
    client: apolloClient,
  })

  return {
    leaderboard: data?.leaderboard || [],
    loading,
    error,
    refetch,
  }
}
