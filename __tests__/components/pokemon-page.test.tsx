import { render, screen } from "@testing-library/react"
import { PokemonPage } from "@/components/pokemon-page"

// Mock child components that need browser APIs / complex deps
jest.mock("@/components/pokemon-type-filter", () => ({
  PokemonTypeFilter: () => <div data-testid="type-filter" />,
}))

jest.mock("@/components/pokeball-spinner", () => ({
  PokeballSpinner: () => <div data-testid="spinner" />,
}))

const mockSetTypes = jest.fn()
const mockSetPage = jest.fn()

jest.mock("@/hooks/use-pokemon-params", () => ({
  usePokemonParams: jest.fn(),
}))

jest.mock("@/hooks/use-pokemon", () => ({
  usePokemonList: jest.fn(),
  usePokemonByType: jest.fn(),
}))

import { usePokemonParams } from "@/hooks/use-pokemon-params"
import { usePokemonList, usePokemonByType } from "@/hooks/use-pokemon"

const mockUsePokemonParams = usePokemonParams as jest.Mock
const mockUsePokemonList = usePokemonList as jest.Mock
const mockUsePokemonByType = usePokemonByType as jest.Mock

const fakePokemon = [
  { name: "pikachu", url: "https://pokeapi.co/api/v2/pokemon/25/" },
  { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
  { name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/4/" },
]

function setupDefaultMocks() {
  mockUsePokemonParams.mockReturnValue({
    types: [],
    page: 1,
    limit: 20,
    offset: 0,
    setTypes: mockSetTypes,
    setPage: mockSetPage,
  })

  mockUsePokemonList.mockReturnValue({
    data: { count: 60, results: fakePokemon },
    isFetching: false,
    isError: false,
  })

  mockUsePokemonByType.mockReturnValue({
    data: null,
    isFetching: false,
    isError: false,
  })
}

beforeEach(() => {
  jest.clearAllMocks()
})

describe("PokemonPage", () => {
  // ── Happy path ──

  it("renders the page title", () => {
    setupDefaultMocks()
    render(<PokemonPage />)

    expect(screen.getByAltText("pokemon_logo")).toBeInTheDocument()
  })

  it("renders pokemon from the list query", () => {
    setupDefaultMocks()
    render(<PokemonPage />)

    expect(screen.getByText("pikachu")).toBeInTheDocument()
    expect(screen.getByText("bulbasaur")).toBeInTheDocument()
    expect(screen.getByText("charmander")).toBeInTheDocument()
  })

  it("renders pagination when there are multiple pages", () => {
    setupDefaultMocks()
    render(<PokemonPage />)

    expect(screen.getByText("Page 1 of 3")).toBeInTheDocument()
  })

  it("renders the type filter", () => {
    setupDefaultMocks()
    render(<PokemonPage />)

    expect(screen.getByTestId("type-filter")).toBeInTheDocument()
  })

  it("shows type-filtered pokemon when types are selected", () => {
    const firePokemon = [
      { name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/4/" },
      { name: "vulpix", url: "https://pokeapi.co/api/v2/pokemon/37/" },
    ]

    mockUsePokemonParams.mockReturnValue({
      types: ["fire"],
      page: 1,
      limit: 20,
      offset: 0,
      setTypes: mockSetTypes,
      setPage: mockSetPage,
    })

    mockUsePokemonList.mockReturnValue({
      data: null,
      isFetching: false,
      isError: false,
    })

    mockUsePokemonByType.mockReturnValue({
      data: firePokemon,
      isFetching: false,
      isError: false,
    })

    render(<PokemonPage />)

    expect(screen.getByText("charmander")).toBeInTheDocument()
    expect(screen.getByText("vulpix")).toBeInTheDocument()
    expect(screen.queryByText("pikachu")).not.toBeInTheDocument()
  })

  // ── Unhappy path ──

  it("shows error message when type query fails", () => {
    mockUsePokemonParams.mockReturnValue({
      types: ["fire"],
      page: 1,
      limit: 20,
      offset: 0,
      setTypes: mockSetTypes,
      setPage: mockSetPage,
    })

    mockUsePokemonList.mockReturnValue({
      data: null,
      isFetching: false,
      isError: false,
    })

    mockUsePokemonByType.mockReturnValue({
      data: null,
      isFetching: false,
      isError: true,
    })

    render(<PokemonPage />)

    expect(screen.getByText(/Failed to load Pokémon/)).toBeInTheDocument()
  })

  it("shows empty message when type filter returns no results", () => {
    mockUsePokemonParams.mockReturnValue({
      types: ["unknown"],
      page: 1,
      limit: 20,
      offset: 0,
      setTypes: mockSetTypes,
      setPage: mockSetPage,
    })

    mockUsePokemonList.mockReturnValue({
      data: null,
      isFetching: false,
      isError: false,
    })

    mockUsePokemonByType.mockReturnValue({
      data: [],
      isFetching: false,
      isError: false,
    })

    render(<PokemonPage />)

    expect(
      screen.getByText(/No Pokémon found for the selected types/)
    ).toBeInTheDocument()
  })

  it("shows loader when type query is fetching", () => {
    mockUsePokemonParams.mockReturnValue({
      types: ["fire"],
      page: 1,
      limit: 20,
      offset: 0,
      setTypes: mockSetTypes,
      setPage: mockSetPage,
    })

    mockUsePokemonList.mockReturnValue({
      data: null,
      isFetching: false,
      isError: false,
    })

    mockUsePokemonByType.mockReturnValue({
      data: null,
      isFetching: true,
      isError: false,
    })

    render(<PokemonPage />)

    expect(screen.getByTestId("spinner")).toBeInTheDocument()
  })

  it("hides pagination when no data loaded yet", () => {
    mockUsePokemonParams.mockReturnValue({
      types: [],
      page: 1,
      limit: 20,
      offset: 0,
      setTypes: mockSetTypes,
      setPage: mockSetPage,
    })

    mockUsePokemonList.mockReturnValue({
      data: null,
      isFetching: true,
      isError: false,
    })

    mockUsePokemonByType.mockReturnValue({
      data: null,
      isFetching: false,
      isError: false,
    })

    render(<PokemonPage />)

    expect(screen.queryByText(/Page/)).not.toBeInTheDocument()
  })
})
