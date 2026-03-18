import { useQuery } from "@tanstack/react-query"
import { POKEMON_QUERIES } from "@/services/api/queries"

export function useTypeList() {
  return useQuery(POKEMON_QUERIES.typeList())
}
