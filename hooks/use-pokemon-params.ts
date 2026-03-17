"use client"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { DEFAULT_LIMIT } from "@/hooks/use-pokemon-list"

export function usePokemonParams() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const types = searchParams.get("type")?.split(",").filter(Boolean) ?? []
  const page = Number(searchParams.get("page")) || 1
  const limit = Number(searchParams.get("limit")) || DEFAULT_LIMIT
  const offset = (page - 1) * limit

  function updateParams(updates: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString())
    // Update or remove parameters based on the provided updates
    for (const [key, value] of Object.entries(updates)) {
      if (value === null) params.delete(key)
      else params.set(key, value)
    }
    const qs = params.toString()
    router.replace(`${pathname}${qs ? `?${qs}` : ""}`)
  }

  function setTypes(newTypes: string[]) {
    updateParams({
      type: newTypes.length > 0 ? newTypes.join(",") : null,
      page: null,
    })
  }

  function setPage(newPage: number) {
    updateParams({
      page: newPage > 1 ? String(newPage) : null,
    })
  }

  return { types, page, limit, offset, setTypes, setPage }
}
