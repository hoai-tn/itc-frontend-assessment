"use client"

import { useState } from "react"
import { PokemonInfiniteList } from "@/components/pokemon-infinite-list"
import { PokemonFilteredList } from "@/components/pokemon-filtered-list"
import { PokemonTypeFilter } from "@/components/pokemon-type-filter"
import { PokeballSpinner } from "@/components/pokeball-spinner"
import { useTypeDetail } from "@/hooks/use-pokemon-types"

export function PokemonPage() {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const isFiltering = selectedTypes.length > 0
  const { data: filteredData, isFetching } = useTypeDetail(selectedTypes)

  // Keep showing infinite list until filtered data arrives
  const showFilteredList = isFiltering && filteredData !== null

  return (
    <div className="mx-auto flex max-w-6xl gap-6 p-6">
      <div className="flex-1 min-w-0">
        <h1 className="mb-6 text-2xl font-bold">Pok&eacute;dex</h1>

        {showFilteredList ? (
          <PokemonFilteredList selectedTypes={selectedTypes} />
        ) : (
          <div className="relative">
            {isFiltering && isFetching && (
              <div className="absolute inset-0 z-10 bg-background/60">
                <div className="sticky top-1/2 flex justify-center">
                  <PokeballSpinner />
                </div>
              </div>
            )}
            <PokemonInfiniteList />
          </div>
        )}
      </div>

      <aside className="w-56 shrink-0">
        <h2 className="mb-3 text-sm font-medium">Filter by Type</h2>
        <PokemonTypeFilter
          selected={selectedTypes}
          onChange={setSelectedTypes}
        />
      </aside>
    </div>
  )
}
