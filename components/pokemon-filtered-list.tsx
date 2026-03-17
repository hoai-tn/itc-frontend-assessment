"use client"

import { useTypeDetail } from "@/hooks/use-pokemon-types"
import { PokemonCard } from "@/components/pokemon-card"
import { PokeballSpinner } from "@/components/pokeball-spinner"

export function PokemonFilteredList({
  selectedTypes,
}: {
  selectedTypes: string[]
}) {
  const { data, isFetching, isError } = useTypeDetail(selectedTypes)

  if (isError) {
    return (
      <p className="text-destructive">Failed to load Pok&eacute;mon.</p>
    )
  }

  if (!isFetching && data?.length === 0) {
    return (
      <p className="text-muted-foreground">
        No Pok&eacute;mon found for the selected types.
      </p>
    )
  }

  return (
    <div className="relative min-h-40">
      {isFetching && (
        <div className="absolute inset-0 z-10 bg-background/60">
          <div className="sticky top-1/2 flex justify-center">
            <PokeballSpinner />
          </div>
        </div>
      )}
      {data && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {data.map((pokemon) => (
            <PokemonCard key={pokemon.name} pokemon={pokemon} />
          ))}
        </div>
      )}
    </div>
  )
}
