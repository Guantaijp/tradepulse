
export interface Market {
    id: string;
    title: string;
    description: string;
    category: string;
    yesOdds: number;
    noOdds: number;
    totalVolume: number;
    status: string;
    resolutionDate?: string | null;
    bets?: Bet[];
}

export interface Bet {
    id: string;
    amount: number;
    odds: number;
    prediction: boolean;
    status: string;
}

// Query/Mutation Specific Interfaces
export interface GetMarketsData {
    markets: Market[];
}

export interface GetMarketsVariables {
    limit?: number;
    offset?: number;
    status?: string;
}

export interface GetMarketData {
    market: Market | null;
}

export interface GetMarketVariables {
    id: string;
}

export interface PlaceBetVariables {
    input: {
        marketId: string;
        userId: string;
        amount: number;
        prediction: boolean;
    }
}

export interface PlaceBetData {
    placeBet: {
        success: boolean;
        message?: string;
        bet?: Omit<Bet, 'marketId' | 'userId' | 'createdAt'>;
    }
}


export interface User {
    id: string;
    username: string;
    email: string;
    balance: number;
    totalBets: number;
    winRate: number;
    totalPnL: number;
}

export interface Bet {
    id: string;
    marketId: string;
    amount: number;
    prediction: boolean;
    odds: number;
    potentialPayout: number;
    status: string;
    createdAt: string;
}

export interface LeaderboardEntry {
    rank: number;
    userId: string;
    username: string;
    pnl: number;
    winRate: number;
    totalBets: number;
}

// --- Query-Specific Data & Variable Interfaces ---

// useUser types
export interface GetUserData {
    user: User | null;
}

export interface GetUserVariables {
    id: string;
}

// useUserBets types
export interface GetUserBetsData {
    userBets: Bet[];
}

export interface GetUserBetsVariables {
    userId: string;
    limit?: number;
}

// useLeaderboard types
export interface GetLeaderboardData {
    leaderboard: LeaderboardEntry[];
}

export interface GetLeaderboardVariables {
    limit?: number;
}
