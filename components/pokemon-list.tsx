import { PokemonCard } from "@/components/pokemon-card"
import type { NamedAPIResource } from "@/services/api"

interface PokemonListProps {
  pokemon: NamedAPIResource[]
}

export function PokemonList({ pokemon }: PokemonListProps) {
  return (
    <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5">
      {pokemon.map((p) => (
        <PokemonCard key={p.name} pokemon={p} />
      ))}
    </div>
  )
}
