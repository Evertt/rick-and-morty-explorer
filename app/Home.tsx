"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

export type SearchResults = { label: string; value: string }[]

export default function Home({
  searchResults,
}: {
  searchResults: SearchResults
}) {
  const [value, setValue] = useState("")
  const router = useRouter()

  useEffect(() => {
    if (!value) return
    router.push(value)
  }, [value])

  return (
    <>
      <h1 className="text-4xl font-bold mb-8">
        Welcome to the Rick and Morty Universe
      </h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Search the Multiverse</h2>
        <div className="flex gap-2">
          <Command className="has-[:focus-within]:signal">
            <CommandInput
              value={
                searchResults.find((result) => result.value === value)?.label
              }
              className="flex-grow justify-between peer"
              placeholder="Search for characters, locations, or episodes..."
            />
            <CommandList className="hidden signal:block">
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {searchResults.map((result) => (
                  <CommandItem
                    key={result.value}
                    value={result.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue)
                    }}
                  >
                    {result.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      </div>
    </>
  )
}
