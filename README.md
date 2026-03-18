# Pokemon Browser

[Demo Video](https://www.loom.com/share/5ba860379ce04c1b943ed4141c47b1af) | Live: [itc-frontend.hoaitran.dev](https://itc-frontend.hoaitran.dev/)

A Pokemon browser built with **Next.js 16**, **React 19**, and the [PokeAPI](https://pokeapi.co/).

## Tech Stack

| Layer          | Technology                                        |
| -------------- | ------------------------------------------------- |
| Framework      | Next.js 16 (App Router, SSR)                      |
| Language       | TypeScript 5.9 (strict)                           |
| Styling        | Tailwind CSS 4, shadcn/ui, Base UI                |
| Data Fetching  | TanStack React Query 5 (with localStorage cache)  |
| Testing        | Jest 30, React Testing Library                    |
| CI             | GitHub Actions (quality + test coverage)           |

## Features

- **Server-side prefetching** with React Query hydration for instant page loads
- **Multi-type filtering** via combobox with client-side pagination fallback
- **Image fallback chain**: animated GIF -> official artwork -> basic sprite
- **Persistent cache** (localStorage, 24h TTL) to minimize API calls
- **Custom Pokemon-themed UI**: Pikachu cursor, pokeball spinner, decorative frames
- **Responsive grid**: 3-5 columns adapting to screen size

## Getting Started

```bash
npm install
npm run dev        # http://localhost:3000
```

## Scripts

```bash
npm run dev         # Start dev server (Turbopack)
npm run build       # Production build
npm run typecheck   # TypeScript check
npm run lint        # ESLint
npm run format      # Prettier format
npm test            # Run tests
npm test -- --coverage  # Tests with coverage
```

## Project Structure

```
app/
  page.tsx              # Server component — SSR prefetch + hydration
  layout.tsx            # Root layout, QueryProvider, custom cursor
components/
  pokemon-page.tsx      # Main client page (list, filter, pagination)
  pokemon-card.tsx      # Card with image fallback chain
  pokemon-type-filter.tsx  # Multi-select type combobox
  pokemon-pagination.tsx   # Prev/next pagination
hooks/
  use-pokemon.ts        # Data fetching (list + multi-type merge)
  use-pokemon-params.ts # URL search param state
services/api/
  client.ts             # Fetch wrapper (pokeapi.co)
  pokemon.ts            # API endpoints
  queries.ts            # React Query configs
__tests__/              # 7 test suites, 41 tests
.github/workflows/
  quality.yml           # TypeScript, ESLint, Prettier checks
  test.yml              # Jest coverage + artifact upload
```

## Architecture Decisions

- **Dual data strategy**: paginated API for unfiltered browsing; client-side merge + dedup for multi-type filtering (PokeAPI has no multi-type endpoint)
- **`staleTime: Infinity`** with persistent cache — Pokemon data doesn't change, so aggressive caching reduces load
- **`unoptimized` on Pokemon images** — external animated GIFs don't benefit from Next.js image optimization and it breaks the fallback handler
