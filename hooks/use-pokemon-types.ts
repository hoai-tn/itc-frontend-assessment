import { useQuery, useQueries } from "@tanstack/react-query"
import { getTypeList, getTypeDetail } from "@/services/api"
import type { NamedAPIResource, PokemonTypeDetail } from "@/services/api"

export function useTypeList() {
  return useQuery({
    queryKey: ["type-list"],
    queryFn: getTypeList,
  })
}

// Module-level cache to keep previous results visible while loading new types
let cachedData: NamedAPIResource[] | null = null

export function useTypeDetail(selectedTypes: string[]) {
  const result = useQueries({
    queries: selectedTypes.map((type) => ({
      queryKey: ["type-detail", type],
      queryFn: () => getTypeDetail(type),
      staleTime: 60 * 1000,
    })),
    combine: (results) => {
      const isFetching = results.some((r) => r.isFetching)
      const isError = results.some((r) => r.isError)
      const resolved = results
        .map((r) => r.data)
        .filter((d): d is PokemonTypeDetail => d !== undefined)

      if (
        resolved.length === selectedTypes.length &&
        selectedTypes.length > 0
      ) {
        // Handle Caching and merging of Pokemon across multiple types, ensuring no duplicates when multiple types are selected
        const seen = new Set<string>()
        const merged = resolved.flatMap((typeDetail) =>
          typeDetail.pokemon
            .filter((p) => {
              if (seen.has(p.pokemon.name)) return false
              seen.add(p.pokemon.name)
              return true
            })
            .map((p) => p.pokemon)
        )
        cachedData = merged
        return { data: merged, isFetching, isError }
      }

      return { data: null, isFetching, isError }
    },
  })

  const data = result.data ?? cachedData

  return {
    data,
    isFetching: result.isFetching,
    isError: result.isError,
    isInitialLoading: result.isFetching && data === null,
  }
}
