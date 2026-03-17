import { PokeballSpinner } from "@/components/pokeball-spinner"

interface WithPokemonLoaderProps {
  isLoading: boolean
  children: React.ReactNode
}

export function WithPokemonLoader({
  isLoading,
  children,
}: WithPokemonLoaderProps) {
  return (
    <div className="relative min-h-40">
      {isLoading && (
        <div className="absolute inset-0 z-10 bg-background/60">
          <div className="sticky top-1/2 flex justify-center">
            <PokeballSpinner />
          </div>
        </div>
      )}
      {children}
    </div>
  )
}
