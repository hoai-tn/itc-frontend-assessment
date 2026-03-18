"use client"

import { useQuery, useQueries } from "@tanstack/react-query"
import { POKEMON_QUERIES } from "@/services/api/queries"
import type {
  NamedAPIResource,
  PokemonTypeDetail,
} from "@/services/api/types/pokemon"

export function usePokemonList(
  offset: number,
  limit: number,
  options?: { enabled?: boolean }
) {
  return useQuery({
    ...POKEMON_QUERIES.list(offset, limit),
    enabled: options?.enabled,
  })
}

export function usePokemonByType(selectedTypes: string[]) {
  return useQueries({
    queries: selectedTypes.map((type) => POKEMON_QUERIES.typeDetail(type)),
    combine: (results) => {
      const isFetching = results.some((r) => r.isFetching)
      const isError = results.some((r) => r.isError)
      const resolved = results
        .map((r) => r.data)
        .filter((d): d is PokemonTypeDetail => d !== undefined)

      let data: NamedAPIResource[] | null = null

      if (
        resolved.length === selectedTypes.length &&
        selectedTypes.length > 0
      ) {
        // Merge types (most recently selected first), deduplicating by name
        const seen = new Set<string>()
        data = [...resolved].reverse().flatMap((typeDetail) =>
          typeDetail.pokemon
            .filter((p) => {
              if (seen.has(p.pokemon.name)) return false
              seen.add(p.pokemon.name)
              return true
            })
            .map((p) => p.pokemon)
        )
      }

      return { data, isFetching, isError }
    },
  })
}
