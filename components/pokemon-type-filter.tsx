"use client"

import { Fragment, useCallback, useEffect, useState } from "react"
import { useDebouncedCallback } from "use-debounce"
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

  const [localSelected, setLocalSelected] = useState(selected)

  // Sync local state when URL params change externally
  const selectedKey = selected.join(",")
  useEffect(() => {
    setLocalSelected(selected)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedKey])

  // Debounce the URL param update to avoid re-renders on every click
  const debouncedSetTypes = useDebouncedCallback((types: string[]) => {
    onSelectedChange(types)
  }, 300)

  const handleValueChange = useCallback(
    (types: string[]) => {
      setLocalSelected(types) // Immediate UI update
      debouncedSetTypes(types) // Debounced URL update
    },
    [debouncedSetTypes]
  )

  const typeNames =
    data?.results
      .filter((t) => !EXCLUDED_TYPES.includes(t.name))
      .map((t) => t.name) ?? []

  return (
    <Combobox
      multiple
      autoHighlight
      items={typeNames}
      value={localSelected}
      onValueChange={handleValueChange}
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
