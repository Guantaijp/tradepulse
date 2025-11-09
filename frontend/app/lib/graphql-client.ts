import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from "@apollo/client"
import { onError } from "@apollo/client/link/error"

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_API || "http://localhost:4000/graphql",
  credentials: "include",
})

const errorLink = onError(({ graphQLErrors, networkError } :any) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }:any) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
    )
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`)
  }
})

export const apolloClient = new ApolloClient({
  ssrMode: typeof window === "undefined",
  link: ApolloLink.from([errorLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
    },
    query: {
      fetchPolicy: "network-only",
    },
  },
})
