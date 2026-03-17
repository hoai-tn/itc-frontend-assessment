export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export interface NamedAPIResource {
  name: string
  url: string
}

export type PokemonListItem = NamedAPIResource

export interface PokemonAbility {
  ability: NamedAPIResource
  is_hidden: boolean
  slot: number
}

export interface PokemonType {
  slot: number
  type: NamedAPIResource
}

export interface PokemonStat {
  base_stat: number
  effort: number
  stat: NamedAPIResource
}

export interface PokemonMove {
  move: NamedAPIResource
}

export interface PokemonSprites {
  front_default: string | null
  front_shiny: string | null
  back_default: string | null
  back_shiny: string | null
  other?: {
    "official-artwork"?: {
      front_default: string | null
      front_shiny: string | null
    }
    dream_world?: {
      front_default: string | null
    }
  }
}

export interface Pokemon {
  id: number
  name: string
  height: number
  weight: number
  base_experience: number
  abilities: PokemonAbility[]
  types: PokemonType[]
  stats: PokemonStat[]
  moves: PokemonMove[]
  sprites: PokemonSprites
  order: number
  species: NamedAPIResource
}

export interface PokemonListParams {
  limit?: number
  offset?: number
}

export interface PokemonTypeDetail {
  id: number
  name: string
  pokemon: {
    pokemon: NamedAPIResource
    slot: number
  }[]
}
