import { useInfiniteQuery } from "@tanstack/react-query"
import { getPokemonList } from "@/services/api"
import type { PaginatedResponse, PokemonListItem } from "@/services/api"

const PAGE_SIZE = 20

export function usePokemonList() {
  return useInfiniteQuery<PaginatedResponse<PokemonListItem>>({
    queryKey: ["pokemon-list"],
    queryFn: ({ pageParam }) =>
      getPokemonList({ limit: PAGE_SIZE, offset: pageParam as number }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined
      const url = new URL(lastPage.next)
      return Number(url.searchParams.get("offset"))
    },
  })
}
