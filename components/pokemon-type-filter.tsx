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
    <Combobox
      multiple
      autoHighlight
      items={typeNames}
      value={selected}
      onValueChange={onSelectedChange}
      virtualized
    >
      <ComboboxChips ref={anchor} className="w-full">
        <ComboboxValue>
          {(values) => (
            <Fragment>
              {values.map((value: string) => (
                <ComboboxChip key={value} className="capitalize">
                  {value}
                </ComboboxChip>
              ))}
              <ComboboxChipsInput placeholder="Filter by type..." />
            </Fragment>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>No type found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item} className="capitalize">
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
