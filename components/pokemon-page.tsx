import { PokemonList } from "@/components/pokemon-list"
import { PokemonTypeFilter } from "@/components/pokemon-type-filter"

export function PokemonPage() {
  return (
    <div className="mx-auto flex max-w-6xl gap-6 p-6">
      <div className="min-w-0 flex-1">
        <h1 className="mb-10 text-2xl font-bold">Pok&eacute;dex</h1>
        <PokemonList />
      </div>

      <aside className="w-56 shrink-0">
        <h2 className="mb-3 text-sm font-medium">Filter by Type</h2>
        <PokemonTypeFilter />
      </aside>
    </div>
  )
}
