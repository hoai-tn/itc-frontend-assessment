import { useQuery } from "@tanstack/react-query"
import { getPokemonList } from "@/services/api"

export const DEFAULT_LIMIT = 20

export function usePokemonList(offset: number, limit: number) {
  return useQuery({
    queryKey: ["pokemon-list", offset, limit],
    queryFn: () => getPokemonList({ limit, offset }),
  })
}
