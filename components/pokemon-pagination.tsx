"use client"

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePokemonParams } from "@/hooks/use-pokemon-params"

export function PokemonPagination({ totalPages }: { totalPages: number }) {
  const { page, setPage } = usePokemonParams()

  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center gap-2 py-8">
      <Button
        variant="outline"
        size="icon"
        disabled={page <= 1}
        onClick={() => setPage(page - 1)}
      >
        <ChevronLeftIcon />
      </Button>
      <span className="text-sm text-muted-foreground">
        Page {page} of {totalPages}
      </span>
      <Button
        variant="outline"
        size="icon"
        disabled={page >= totalPages}
        onClick={() => setPage(page + 1)}
      >
        <ChevronRightIcon />
      </Button>
    </div>
  )
}
