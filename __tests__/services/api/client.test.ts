import { apiClient } from "@/services/api/client"

const mockFetch = jest.fn()
global.fetch = mockFetch

beforeEach(() => {
  mockFetch.mockReset()
})

describe("apiClient", () => {
  describe("get", () => {
    it("fetches from the correct URL", async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ name: "bulbasaur" }),
      })

      await apiClient.get("/pokemon/1")

      expect(mockFetch).toHaveBeenCalledWith(
        "https://pokeapi.co/api/v2/pokemon/1",
        expect.objectContaining({ method: "GET" })
      )
    })

    it("sets Content-Type header", async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({}),
      })

      await apiClient.get("/pokemon")

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            "Content-Type": "application/json",
          }),
        })
      )
    })

    it("returns parsed JSON on success", async () => {
      const data = { id: 1, name: "bulbasaur" }
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(data),
      })

      const result = await apiClient.get("/pokemon/1")

      expect(result).toEqual(data)
    })

    it("throws on non-ok response", async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 404,
        statusText: "Not Found",
      })

      await expect(apiClient.get("/pokemon/99999")).rejects.toThrow(
        "API error: 404 Not Found"
      )
    })

    it("merges custom headers with defaults", async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({}),
      })

      await apiClient.get("/pokemon", {
        headers: { Authorization: "Bearer token" },
      })

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer token",
          },
        })
      )
    })
  })
})
