import { queryOptions } from "@tanstack/react-query"
import { getPokemonList, getTypeList, getTypeDetail } from "@/services/api/pokemon"

export const POKEMON_QUERIES = {
  list: (offset: number, limit: number) =>
    queryOptions({
      queryKey: ["pokemon-list", offset, limit] as const,
      queryFn: () => getPokemonList({ limit, offset }),
    }),

  typeList: () =>
    queryOptions({
      queryKey: ["type-list"] as const,
      queryFn: getTypeList,
    }),

  typeDetail: (name: string) =>
    queryOptions({
      queryKey: ["type-detail", name] as const,
      queryFn: () => getTypeDetail(name),
    }),
}
