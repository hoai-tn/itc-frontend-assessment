"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client"
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister"

const ONE_DAY_MS = 24 * 60 * 60 * 1000

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        gcTime: ONE_DAY_MS,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined

function getQueryClient() {
  if (typeof window === "undefined") return makeQueryClient()
  return (browserQueryClient ??= makeQueryClient())
}

const persister =
  typeof window !== "undefined"
    ? createSyncStoragePersister({ storage: localStorage })
    : undefined

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient()

  if (!persister) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
  }

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister, maxAge: ONE_DAY_MS }}
    >
      {children}
    </PersistQueryClientProvider>
  )
}
