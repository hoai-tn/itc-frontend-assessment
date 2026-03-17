import { apiClient } from "./client"
import type {
  NamedAPIResource,
  PaginatedResponse,
  Pokemon,
  PokemonListItem,
  PokemonListParams,
  PokemonTypeDetail,
} from "./types/pokemon"

export function getPokemonList(params?: PokemonListParams) {
  const searchParams = new URLSearchParams()
  if (params?.limit) searchParams.set("limit", String(params.limit))
  if (params?.offset) searchParams.set("offset", String(params.offset))

  const query = searchParams.toString()
  return apiClient.get<PaginatedResponse<PokemonListItem>>(
    `/pokemon${query ? `?${query}` : ""}`
  )
}

export function getPokemonByName(name: string) {
  return apiClient.get<Pokemon>(`/pokemon/${name}`)
}

export function getPokemonById(id: number) {
  return apiClient.get<Pokemon>(`/pokemon/${id}`)
}

export function getTypeList() {
  return apiClient.get<PaginatedResponse<NamedAPIResource>>("/type")
}

export function getTypeDetail(name: string) {
  return apiClient.get<PokemonTypeDetail>(`/type/${name}`)
}
