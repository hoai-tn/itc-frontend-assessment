"use client"

import { PokemonList } from "@/components/pokemon-list"
import { PokemonPagination } from "@/components/pokemon-pagination"
import { PokemonTypeFilter } from "@/components/pokemon-type-filter"
import { WithPokemonLoader } from "@/hocs/with-pokemon-loader"
import { usePokemonList, usePokemonByType } from "@/hooks/use-pokemon-list"
import { usePokemonParams } from "@/hooks/use-pokemon-params"
import { useMemo } from "react"

export function PokemonPage() {
  const { types, page, limit, offset, setTypes, setPage } = usePokemonParams()
  const isFiltering = types.length > 0

  const listQuery = usePokemonList(offset, limit)
  const typeQuery = usePokemonByType(types)

  /**
   * If we're filtering by type, we have to do client-side pagination
   * since the API doesn't support it for type queries.
   * Otherwise, we can use the paginated list endpoint.
   */
  const pokemon = isFiltering
    ? (typeQuery.data?.slice(offset, offset + limit) ?? [])
    : (listQuery.data?.results ?? [])

  const totalPages = isFiltering
    ? typeQuery.data
      ? Math.ceil(typeQuery.data.length / limit)
      : 0
    : listQuery.data
      ? Math.ceil(listQuery.data.count / limit)
      : 0

  if (typeQuery.isError) {
    return <p className="text-destructive">Failed to load Pok&eacute;mon.</p>
  }

  if (typeQuery.data?.length === 0) {
    return (
      <p className="text-muted-foreground">
        No Pok&eacute;mon found for the selected types.
      </p>
    )
  }

  return (
    <div className="mx-auto max-w-6xl p-6">
      <h1 className="mb-6 text-2xl font-bold">Pok&eacute;dex</h1>
      <div className="mb-6">
        <PokemonTypeFilter selected={types} onSelectedChange={setTypes} />
      </div>
      <WithPokemonLoader isLoading={typeQuery.isFetching}>
        <PokemonList pokemon={pokemon} />
      </WithPokemonLoader>
      <PokemonPagination
        totalPages={totalPages}
        page={page}
        onPageChange={setPage}
      />
    </div>
  )
}
