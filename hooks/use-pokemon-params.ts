"use client"
import { startTransition } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { DEFAULT_LIMIT } from "@/lib/constants"

export function usePokemonParams() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const types = searchParams.get("type")?.split(",").filter(Boolean) ?? []
  const page = Number(searchParams.get("page")) || 1
  const limit = Number(searchParams.get("limit")) || DEFAULT_LIMIT
  const offset = (page - 1) * limit
  const search = searchParams.get("search") || null

  function updateParams(updates: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString())
    for (const [key, value] of Object.entries(updates)) {
      if (value === null) params.delete(key)
      else params.set(key, value)
    }
    const qs = params.toString()
    startTransition(() => {
      router.replace(`${pathname}${qs ? `?${qs}` : ""}`)
    })
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

  function setSearch(value: string) {
    updateParams({
      search: value || null,
      page: null,
    })
  }

  return { types, page, limit, offset, search, setTypes, setPage, setSearch }
}
