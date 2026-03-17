import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query"
import { getPokemonList, getTypeList } from "@/services/api"
import { PokemonPage } from "@/components/pokemon-page"

export default async function Page() {
  const queryClient = new QueryClient()

  await Promise.all([
    queryClient.prefetchInfiniteQuery({
      queryKey: ["pokemon-list"],
      queryFn: ({ pageParam }) =>
        getPokemonList({ limit: 20, offset: pageParam as number }),
      initialPageParam: 0,
    }),
    queryClient.prefetchQuery({
      queryKey: ["type-list"],
      queryFn: getTypeList,
    }),
  ])

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PokemonPage />
    </HydrationBoundary>
  )
}
