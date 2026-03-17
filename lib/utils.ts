import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const SPRITE_BASE =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon"

// Animated GIF (Gen V Black & White) — only available for Pokemon #1–649
// Falls back to official artwork PNG, then basic sprite PNG
export function getPokemonImageUrls(id: string): string[] {
  return [
    `${SPRITE_BASE}/versions/generation-v/black-white/animated/${id}.gif`,
    `${SPRITE_BASE}/other/official-artwork/${id}.png`,
    `${SPRITE_BASE}/${id}.png`,
  ]
}
