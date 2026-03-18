import { useQuery, useQueries } from "@tanstack/react-query"
import { getPokemonList, getTypeDetail } from "@/services/api"
import type { NamedAPIResource, PokemonTypeDetail } from "@/services/api"

export const DEFAULT_LIMIT = 20

export function usePokemonList(offset: number, limit: number) {
  return useQuery({
    queryKey: ["pokemon-list", offset, limit],
    queryFn: () => getPokemonList({ limit, offset }),
  })
}

/** Module-level cache to keep previous results visible while loading new types */
let cachedData: NamedAPIResource[] | null = null

export function usePokemonByType(selectedTypes: string[]) {
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
        // Reverse so the most recently selected type's Pokémon appear first
        const seen = new Set<string>()
        const merged = [...resolved].reverse().flatMap((typeDetail) =>
          typeDetail.pokemon
            .filter((p) => {
              if (seen.has(p.pokemon.name)) return false
              seen.add(p.pokemon.name)
              return true
            })
            .map((p) => p.pokemon),
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
