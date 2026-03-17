"use client"

import { usePokemonList } from "@/hooks/use-pokemon-list"
import { usePokemonParams } from "@/hooks/use-pokemon-params"
import { useTypeDetail } from "@/hooks/use-pokemon-types"
import { PokemonCard } from "@/components/pokemon-card"
import { WithPokemonLoader } from "@/hocs/with-pokemon-loader"
import { PokemonPagination } from "@/components/pokemon-pagination"
import type { NamedAPIResource } from "@/services/api"

function usePokemonData() {
  const { types, offset, limit } = usePokemonParams()
  const isFiltering = types.length > 0

  const listQuery = usePokemonList(offset, limit)
  const typeQuery = useTypeDetail(types)

  if (isFiltering) {
    const paginatedData = typeQuery.data?.slice(offset, offset + limit) ?? []
    const totalPages = typeQuery.data
      ? Math.ceil(typeQuery.data.length / limit)
      : 0

    return {
      pokemon: paginatedData,
      totalPages,
      isLoading: typeQuery.isFetching,
      isError: typeQuery.isError,
      isEmpty: !typeQuery.isFetching && typeQuery.data?.length === 0,
    }
  }

  return {
    pokemon: listQuery.data?.results ?? [],
    totalPages: listQuery.data ? Math.ceil(listQuery.data.count / limit) : 0,
    isLoading: listQuery.status === "pending",
    isError: listQuery.status === "error",
    isEmpty: false,
  }
}

export function PokemonList() {
  const { pokemon, totalPages, isLoading, isError, isEmpty } = usePokemonData()

  if (isError) {
    return <p className="text-destructive">Failed to load Pok&eacute;mon.</p>
  }

  if (isEmpty) {
    return (
      <p className="text-muted-foreground">
        No Pok&eacute;mon found for the selected types.
      </p>
    )
  }

  return (
    <WithPokemonLoader isLoading={isLoading}>
      <PokemonGrid pokemon={pokemon} />
      <PokemonPagination totalPages={totalPages} />
    </WithPokemonLoader>
  )
}

function PokemonGrid({ pokemon }: { pokemon: NamedAPIResource[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {pokemon.map((p) => (
        <PokemonCard key={p.name} pokemon={p} />
      ))}
    </div>
  )
}
