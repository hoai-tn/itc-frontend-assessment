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
    <div className="group flex flex-col items-center gap-2">
      <div className="relative">
        <div className="flex flex-col items-center leading-tight">
          <span className="text-[10px] font-semibold text-muted-foreground/60">
            #{id.padStart(3, "0")}
          </span>
          <span className="text-sm font-medium capitalize">{pokemon.name}</span>
        </div>
        <img
          src={imageUrls[0]}
          alt={pokemon.name}
          width={96}
          height={96}
          className="h-24 w-24 object-contain drop-shadow-md transition-transform group-hover:scale-110"
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
      </div>
    </div>
  )
}
