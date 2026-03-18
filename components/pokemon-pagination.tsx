"use client"

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PokemonPaginationProps {
  totalPages: number
  page: number
  onPageChange: (page: number) => void
}

export function PokemonPagination({
  totalPages,
  page,
  onPageChange,
}: PokemonPaginationProps) {
  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center gap-2 py-8">
      <Button
        variant="outline"
        size="icon"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="border-[#FFCC01] bg-[#FFFDE7] text-[#3C5AA6] hover:bg-[#FFCC01]/30 hover:text-[#3C5AA6] disabled:opacity-40"
      >
        <ChevronLeftIcon />
      </Button>
      <span className="rounded-lg bg-[#FFCC01] px-3 py-1 text-sm font-semibold text-[#3C5AA6]">
        Page {page} of {totalPages}
      </span>
      <Button
        variant="outline"
        size="icon"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className="border-[#FFCC01] bg-[#FFFDE7] text-[#3C5AA6] hover:bg-[#FFCC01]/30 hover:text-[#3C5AA6] disabled:opacity-40"
      >
        <ChevronRightIcon />
      </Button>
    </div>
  )
}
