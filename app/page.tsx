import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query"
import { getPokemonList, getTypeList, getTypeDetail } from "@/services/api"
import { PokemonPage } from "@/components/pokemon-page"
import { DEFAULT_LIMIT } from "@/hooks/use-pokemon-list"

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; page?: string; limit?: string }>
}) {
  const params = await searchParams
  const limit = Number(params.limit) || DEFAULT_LIMIT
  const page = Number(params.page) || 1
  const offset = (page - 1) * limit
  const types = params.type?.split(",").filter(Boolean) ?? []

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
      },
    },
  })

  await Promise.all([
    // 1. Prefetch the main list and types for better UX when navigating
    queryClient.prefetchQuery({
      queryKey: ["pokemon-list", offset, limit],
      queryFn: () => getPokemonList({ limit, offset }),
    }),
    // 2. Prefetch all types and details for the filter sidebar
    queryClient.prefetchQuery({
      queryKey: ["type-list"],
      queryFn: getTypeList,
    }),
    // 3. Prefetch details for currently selected types to speed up filtering
    ...types.map((type) =>
      queryClient.prefetchQuery({
        queryKey: ["type-detail", type],
        queryFn: () => getTypeDetail(type),
      })
    ),
  ])

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PokemonPage />
    </HydrationBoundary>
  )
}
