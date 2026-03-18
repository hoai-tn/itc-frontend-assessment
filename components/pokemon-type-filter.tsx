"use client"

import { Fragment } from "react"
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox"
import { PikachuFrame } from "@/components/pikachu-frame"
import { useTypeList } from "@/hooks/use-pokemon-types"

// We exclude "unknown" and "shadow" types since they don't have any Pokemon associated with them.
const EXCLUDED_TYPES = ["unknown", "shadow"]

interface PokemonTypeFilterProps {
  selected: string[]
  onSelectedChange: (types: string[]) => void
}

export function PokemonTypeFilter({
  selected,
  onSelectedChange,
}: PokemonTypeFilterProps) {
  const anchor = useComboboxAnchor()
  const { data } = useTypeList()

  const typeNames =
    data?.results
      .filter((t) => !EXCLUDED_TYPES.includes(t.name))
      .map((t) => t.name) ?? []

  return (
    <PikachuFrame>
      <Combobox
        multiple
        autoHighlight
        items={typeNames}
        value={selected}
        onValueChange={onSelectedChange}
        virtualized
      >
        <ComboboxChips
          ref={anchor}
          className="w-full min-h-11 gap-1.5 rounded-xl border-2 border-[#E8C800] bg-[#fff9b8] px-3 py-2 shadow-inner focus-within:border-[#FFCC01] focus-within:ring-2 focus-within:ring-[#FFCC01]/30"
        >
          <ComboboxValue>
            {(values) => (
              <Fragment>
                {values.map((value: string) => (
                  <ComboboxChip
                    key={value}
                    className="h-7 gap-1.5 rounded-full bg-[#FFCC01] px-3 text-sm font-semibold capitalize text-[#3C5AA6] shadow-[0_1px_2px_rgba(0,0,0,0.1)] transition-colors hover:bg-[#FFD84D]"
                  >
                    {value}
                  </ComboboxChip>
                ))}
                <ComboboxChipsInput
                  placeholder="Filter by type..."
                  className="text-sm text-[#3C5AA6] placeholder:text-[#3C5AA6]/40"
                />
              </Fragment>
            )}
          </ComboboxValue>
        </ComboboxChips>
        <ComboboxContent anchor={anchor} className="border-[#FFCC01]/40 bg-[#FFFDE7]">
          <ComboboxEmpty>No type found.</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem
                key={item}
                value={item}
                className="capitalize data-highlighted:bg-[#FFCC01]/30 data-highlighted:text-[#3C5AA6]"
              >
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </PikachuFrame>
  )
}
