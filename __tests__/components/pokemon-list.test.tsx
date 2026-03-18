import { render, screen } from "@testing-library/react"
import { PokemonList } from "@/components/pokemon-list"

const pokemon = [
  { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
  { name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/4/" },
  { name: "squirtle", url: "https://pokeapi.co/api/v2/pokemon/7/" },
]

describe("PokemonList", () => {
  // ── Happy path ──

  it("renders all pokemon cards", () => {
    render(<PokemonList pokemon={pokemon} />)

    expect(screen.getByText("bulbasaur")).toBeInTheDocument()
    expect(screen.getByText("charmander")).toBeInTheDocument()
    expect(screen.getByText("squirtle")).toBeInTheDocument()
  })

  it("renders an image for each pokemon", () => {
    render(<PokemonList pokemon={pokemon} />)

    const images = screen.getAllByRole("img")
    expect(images).toHaveLength(3)
  })

  // ── Unhappy path ──

  it("renders nothing when list is empty", () => {
    const { container } = render(<PokemonList pokemon={[]} />)

    const grid = container.firstChild as HTMLElement
    expect(grid.children).toHaveLength(0)
  })
})
