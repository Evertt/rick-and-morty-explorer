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
import Link from "next/link"

export type SearchResults = { label: string; value: string }[]

export default function Home({
  searchResults,
}: {
  searchResults: SearchResults
}) {
  const [value, setValue] = useState("")
  const router = useRouter()

  // useEffect(() => setValue(""), [])

  useEffect(() => {
    if (!value) return
    console.log("value: ", value)
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
          <Command
            className="has-[:focus-within]:signal"
            filter={(value, search) =>
              searchResults.find(
                (result) =>
                  result.value === value && result.label.includes(search)
              )
                ? 1
                : 0
            }
          >
            <CommandInput
              className="flex-grow justify-between after:content-[attr(data-value)]"
              placeholder="Search for characters, locations, or episodes..."
            />
            <CommandList className="transition-all invisible signal:visible">
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup className="has-[:focus-within]:signal has-[:active]:signal">
                {searchResults.map((result) => (
                  <CommandItem
                    className="focus-within:signal active:signal"
                    key={result.value}
                    value={result.value}
                    onSelect={(currentValue) => setValue(currentValue)}
                  >
                    <Link
                      onClick={(e) => {
                        e.preventDefault()
                        setValue(result.value)
                        ;(e.target as HTMLAnchorElement).blur()
                      }}
                      className="focus-within:signal active:signal w-full"
                      href={result.value}
                    >
                      {result.label}
                    </Link>
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
