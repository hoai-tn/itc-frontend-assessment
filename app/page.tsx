import { Suspense } from "react"
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query"
import { POKEMON_QUERIES } from "@/services/api/queries"
import { PokemonPage } from "@/components/pokemon-page"
import { DEFAULT_LIMIT } from "@/lib/constants"

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; page?: string; limit?: string }>
}) {
  const params = await searchParams
  const limit = Number(params.limit) || DEFAULT_LIMIT
  const page = Number(params.page) || 1
  const offset = (page - 1) * limit
  const types = params.type?.split(",").filter(Boolean) ?? []

  const queryClient = new QueryClient()

  await Promise.all([
    queryClient.prefetchQuery(POKEMON_QUERIES.list(offset, limit)),
    queryClient.prefetchQuery(POKEMON_QUERIES.typeList()),
    ...types.map((type) =>
      queryClient.prefetchQuery(POKEMON_QUERIES.typeDetail(type))
    ),
  ])

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense>
        <PokemonPage />
      </Suspense>
    </HydrationBoundary>
  )
}
