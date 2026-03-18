import { render, screen, fireEvent } from "@testing-library/react"
import { PokemonCard } from "@/components/pokemon-card"

const pikachu = {
  name: "pikachu",
  url: "https://pokeapi.co/api/v2/pokemon/25/",
}

describe("PokemonCard", () => {
  // ── Happy path ──

  it("renders the pokemon name", () => {
    render(<PokemonCard pokemon={pikachu} />)

    expect(screen.getByText("pikachu")).toBeInTheDocument()
  })

  it("renders the formatted id with leading zeros", () => {
    render(<PokemonCard pokemon={pikachu} />)

    expect(screen.getByText("#025")).toBeInTheDocument()
  })

  it("renders the animated GIF as primary image source", () => {
    render(<PokemonCard pokemon={pikachu} />)

    const img = screen.getByAltText("pikachu") as HTMLImageElement
    expect(img.src).toContain("/animated/25.gif")
  })

  it("uses lazy loading", () => {
    render(<PokemonCard pokemon={pikachu} />)

    const img = screen.getByAltText("pikachu")
    expect(img).toHaveAttribute("loading", "lazy")
  })

  it("extracts id from URL without trailing slash", () => {
    render(
      <PokemonCard
        pokemon={{ name: "mew", url: "https://pokeapi.co/api/v2/pokemon/151" }}
      />
    )

    expect(screen.getByText("#151")).toBeInTheDocument()
  })

  // ── Unhappy path ──

  it("falls back to official artwork on image error", () => {
    render(<PokemonCard pokemon={pikachu} />)

    const img = screen.getByAltText("pikachu") as HTMLImageElement
    // Simulate the browser setting src to the full URL
    Object.defineProperty(img, "src", {
      writable: true,
      value: img.getAttribute("src"),
    })

    fireEvent.error(img)

    expect(img.src).toContain("/official-artwork/25.png")
  })

  it("falls back to basic sprite after artwork fails", () => {
    render(<PokemonCard pokemon={pikachu} />)

    const img = screen.getByAltText("pikachu") as HTMLImageElement
    // Set src to artwork URL (simulating first fallback already happened)
    Object.defineProperty(img, "src", {
      writable: true,
      value:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
    })

    fireEvent.error(img)

    expect(img.src).toContain("/pokemon/25.png")
    expect(img.src).not.toContain("/official-artwork/")
  })
})
