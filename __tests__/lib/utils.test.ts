import { getPokemonImageUrls } from "@/lib/utils"

const SPRITE_BASE =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon"

describe("getPokemonImageUrls", () => {
  it("returns 3 URLs in priority order: animated GIF, artwork, sprite", () => {
    const urls = getPokemonImageUrls("25")

    expect(urls).toHaveLength(3)
    expect(urls[0]).toBe(
      `${SPRITE_BASE}/versions/generation-v/black-white/animated/25.gif`
    )
    expect(urls[1]).toBe(`${SPRITE_BASE}/other/official-artwork/25.png`)
    expect(urls[2]).toBe(`${SPRITE_BASE}/25.png`)
  })

  it("works with single-digit IDs", () => {
    const urls = getPokemonImageUrls("1")

    expect(urls[0]).toContain("/animated/1.gif")
    expect(urls[2]).toContain("/1.png")
  })

  it("works with high IDs", () => {
    const urls = getPokemonImageUrls("1000")

    expect(urls[0]).toContain("/animated/1000.gif")
  })
})
