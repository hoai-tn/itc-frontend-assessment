"use client"

import { useState } from "react"
import { XIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useTypeList } from "@/hooks/use-pokemon-types"

const EXCLUDED_TYPES = ["unknown", "shadow"]

interface PokemonTypeFilterProps {
  selected: string[]
  onChange: (types: string[]) => void
}

export function PokemonTypeFilter({
  selected,
  onChange,
}: PokemonTypeFilterProps) {
  const [open, setOpen] = useState(false)
  const { data } = useTypeList()

  const types =
    data?.results.filter((t) => !EXCLUDED_TYPES.includes(t.name)) ?? []

  function toggle(type: string) {
    if (selected.includes(type)) {
      onChange(selected.filter((t) => t !== type))
    } else {
      onChange([...selected, type])
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start">
            {selected.length > 0
              ? `${selected.length} type${selected.length > 1 ? "s" : ""} selected`
              : "Filter by type..."}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-52 p-0" align="start">
          <Command>
            <CommandInput placeholder="Search types..." />
            <CommandList>
              <CommandEmpty>No type found.</CommandEmpty>
              <CommandGroup>
                {types.map((type) => (
                  <CommandItem
                    key={type.name}
                    value={type.name}
                    data-checked={selected.includes(type.name)}
                    onSelect={() => toggle(type.name)}
                    className="capitalize"
                  >
                    {type.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {selected.map((type) => (
            <Badge
              key={type}
              variant="secondary"
              className="cursor-pointer gap-1 capitalize"
              onClick={() => toggle(type)}
            >
              {type}
              <XIcon className="size-3" />
            </Badge>
          ))}
          <button
            onClick={() => onChange([])}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  )
}
