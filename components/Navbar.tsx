"use client"

import { useState } from "react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu"
import slug from "slug"
import type { EpisodesCache } from "@/app/data/get-episodes"
import type { LocationsCache } from "@/app/data/get-locations"
import type { CharactersCache } from "@/app/data/get-characters"

type NavbarProps = {
  episodes: EpisodesCache
  types: LocationsCache["types"]
  dimensions: LocationsCache["dimensions"]
  characters: CharactersCache
}

export function Navbar({ episodes, types, dimensions, characters }: NavbarProps) {
  const [openedDropdown, setOpenedDropdown] = useState<
    "seasons" | "locations" | "characters" | undefined
  >()

  const openDropdown = (menu: "seasons" | "locations" | "characters") => {
    setOpenedDropdown(menu)
  }

  const closeDropdown = () => {
    setOpenedDropdown(undefined)
  }

  return (
    <nav className="flex space-x-0 sm:space-x-8 justify-center">
      {/* Seasons dropdown */}
      <DropdownMenu
        open={openedDropdown === "seasons"}
        onOpenChange={(open) =>
          open ? openDropdown("seasons") : closeDropdown()
        }
      >
        <div
          onMouseEnter={() => openDropdown("seasons")}
          onMouseLeave={closeDropdown}
        >
          <DropdownMenuTrigger className="cursor-default py-2 px-4 hover:bg-gray-700 rounded">
            Seasons
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {Object.entries(episodes).map(([season, episodes]) => (
              <DropdownMenuSub key={season}>
                <DropdownMenuSubTrigger>
                  Season {+season}
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="max-h-[60vh] overflow-y-auto">
                    {Object.entries(episodes).map(([idSlug, episode], i) => (
                      <DropdownMenuItem key={idSlug}>
                        <Link
                          className="inline-block w-full"
                          href={`/season/${+season}/episode/${i + 1}/${slug(
                            episode.name
                          )}`}
                        >
                          {episode.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            ))}
          </DropdownMenuContent>
        </div>
      </DropdownMenu>

      <DropdownMenu
        open={openedDropdown === "locations"}
        onOpenChange={(open) =>
          open ? openDropdown("locations") : closeDropdown()
        }
      >
        <div
          // className="contents"
          onMouseEnter={() => openDropdown("locations")}
          onMouseLeave={closeDropdown}
        >
          <DropdownMenuTrigger className="cursor-default py-2 px-4 hover:bg-gray-700 rounded">
            {/* <Link href="/locations"> */}
            Locations
            {/* </Link> */}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Types</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="max-h-[60vh] overflow-y-auto">
                  {Object.keys(types).map((type) => (
                    <DropdownMenuSub key={type}>
                      <DropdownMenuSubTrigger className="capitalize">
                        {type}
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent className="max-h-[60vh] overflow-y-auto">
                          {Object.values(types[type]).map((location) => (
                            <DropdownMenuItem key={location.id}>
                              <Link
                                href={`/locations/${slug(location.name)}`}
                                className="inline-block w-full capitalize"
                              >
                                {location.name}
                              </Link>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>

            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Dimensions</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="max-h-[60vh] overflow-y-auto">
                  {Object.keys(dimensions).map((dimension) => (
                    <DropdownMenuSub key={dimension}>
                      <DropdownMenuSubTrigger className="capitalize">
                        {dimension}
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent className="max-h-[60vh] overflow-y-auto">
                          {Object.values(dimensions[dimension]).map(
                            (location) => (
                              <DropdownMenuItem key={location.id}>
                                <Link
                                  href={`/locations/${slug(location.name)}`}
                                  className="inline-block w-full capitalize"
                                >
                                  {location.name}
                                </Link>
                              </DropdownMenuItem>
                            )
                          )}
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </div>
      </DropdownMenu>

      <DropdownMenu
        open={openedDropdown === "characters"}
        onOpenChange={(open) =>
          open ? openDropdown("characters") : closeDropdown()
        }
      >
        <div
          onMouseEnter={() => openDropdown("characters")}
          onMouseLeave={closeDropdown}
        >
          <DropdownMenuTrigger className="cursor-default py-2 px-4 hover:bg-gray-700 rounded">
            Characters
          </DropdownMenuTrigger>
          <DropdownMenuContent className="max-h-[60vh] overflow-y-auto">
            {Object.entries(characters).map(([nameSlug, character]) => (
              <DropdownMenuItem key={nameSlug}>
                <Link
                  href={`/characters/${nameSlug}`}
                  className="inline-block w-full"
                >
                  {character.name}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </div>
      </DropdownMenu>
    </nav>
  )
}
