import {
  getPokemonList,
  getPokemonByName,
  getPokemonById,
  getTypeList,
  getTypeDetail,
} from "@/services/api/pokemon"
import { apiClient } from "@/services/api/client"

jest.mock("@/services/api/client", () => ({
  apiClient: { get: jest.fn() },
}))

const mockGet = apiClient.get as jest.Mock

beforeEach(() => {
  mockGet.mockReset()
})

describe("getPokemonList", () => {
  it("calls /pokemon with no params by default", async () => {
    mockGet.mockResolvedValue({ count: 0, results: [] })

    await getPokemonList()

    expect(mockGet).toHaveBeenCalledWith("/pokemon")
  })

  it("appends limit and offset as query params", async () => {
    mockGet.mockResolvedValue({ count: 100, results: [] })

    await getPokemonList({ limit: 20, offset: 40 })

    expect(mockGet).toHaveBeenCalledWith("/pokemon?limit=20&offset=40")
  })

  it("skips zero-value offset", async () => {
    mockGet.mockResolvedValue({ count: 100, results: [] })

    await getPokemonList({ limit: 10, offset: 0 })

    expect(mockGet).toHaveBeenCalledWith("/pokemon?limit=10")
  })
})

describe("getPokemonByName", () => {
  it("calls /pokemon/:name", async () => {
    mockGet.mockResolvedValue({ id: 25, name: "pikachu" })

    const result = await getPokemonByName("pikachu")

    expect(mockGet).toHaveBeenCalledWith("/pokemon/pikachu")
    expect(result.name).toBe("pikachu")
  })
})

describe("getPokemonById", () => {
  it("calls /pokemon/:id", async () => {
    mockGet.mockResolvedValue({ id: 1, name: "bulbasaur" })

    const result = await getPokemonById(1)

    expect(mockGet).toHaveBeenCalledWith("/pokemon/1")
    expect(result.id).toBe(1)
  })
})

describe("getTypeList", () => {
  it("calls /type", async () => {
    mockGet.mockResolvedValue({ count: 20, results: [] })

    await getTypeList()

    expect(mockGet).toHaveBeenCalledWith("/type")
  })
})

describe("getTypeDetail", () => {
  it("calls /type/:name", async () => {
    mockGet.mockResolvedValue({ id: 10, name: "fire", pokemon: [] })

    const result = await getTypeDetail("fire")

    expect(mockGet).toHaveBeenCalledWith("/type/fire")
    expect(result.name).toBe("fire")
  })
})
