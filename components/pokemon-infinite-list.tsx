"use client"

import { useCallback } from "react"
import { usePokemonList } from "@/hooks/use-pokemon-list"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { PokemonCard } from "@/components/pokemon-card"
import { PokeballSpinner } from "@/components/pokeball-spinner"

export function PokemonInfiniteList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    usePokemonList()

  const handleIntersect = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  const loadMoreRef = useIntersectionObserver(
    handleIntersect,
    hasNextPage ?? false
  )

  if (status === "pending") {
    return <PokeballSpinner className="py-20" />
  }

  if (status === "error") {
    return (
      <p className="text-destructive">Failed to load Pok&eacute;mon.</p>
    )
  }

  const allPokemon = data.pages.flatMap((page) => page.results)

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {allPokemon.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
      <div ref={loadMoreRef} className="flex justify-center py-8">
        {(isFetchingNextPage || hasNextPage) && <PokeballSpinner />}
      </div>
    </>
  )
}
