import { getPokemonImageUrls } from "@/lib/utils"
import type { NamedAPIResource } from "@/services/api"

function getPokemonId(url: string) {
  const segments = url.replace(/\/$/, "").split("/")
  return segments[segments.length - 1]
}

export function PokemonCard({ pokemon }: { pokemon: NamedAPIResource }) {
  const id = getPokemonId(pokemon.url)
  const imageUrls = getPokemonImageUrls(id)

  return (
    <div className="flex flex-col items-center rounded-lg border p-4 transition-colors hover:bg-accent">
      <img
        src={imageUrls[0]}
        alt={pokemon.name}
        className="h-24 w-24 object-contain"
        loading="lazy"
        onError={(e) => {
          const img = e.currentTarget
          const currentIndex = imageUrls.indexOf(img.src)
          const nextSrc = imageUrls[currentIndex + 1]
          if (nextSrc) {
            img.src = nextSrc
          }
        }}
      />
      <span className="mt-2 text-xs text-muted-foreground">
        #{id.padStart(3, "0")}
      </span>
      <span className="text-sm font-medium capitalize">{pokemon.name}</span>
    </div>
  )
}
