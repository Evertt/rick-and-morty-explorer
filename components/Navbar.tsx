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
import type { EpisodesCache } from "@/app/data/get-episodes"
import slug from "slug"

type NavbarProps = {
  episodes: EpisodesCache
  typeNames: string[]
  dimensionNames: string[]
}

export function Navbar({
  episodes,
  typeNames,
  dimensionNames,
}: NavbarProps) {
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
    <nav className="flex space-x-4">
      {/* Seasons dropdown */}
      <DropdownMenu
        open={openedDropdown === "seasons"}
        onOpenChange={(open) =>
          open ? openDropdown("seasons") : closeDropdown()
        }
      >
        <div
          className="contents"
          onMouseEnter={() => openDropdown("seasons")}
          onMouseLeave={closeDropdown}
        >
          <DropdownMenuTrigger>
            <Link
              href="/seasons"
              className="py-2 px-4 hover:bg-gray-700 rounded"
            >
              Seasons
            </Link>
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
                        <Link href={`/season/${+season}/episode/${(i+1)}/${slug(episode.name)}`}>
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
          className="contents"
          onMouseEnter={() => openDropdown("locations")}
          onMouseLeave={closeDropdown}
        >
          <DropdownMenuTrigger>
            <Link
              href="/locations"
              className="py-2 px-4 hover:bg-gray-700 rounded"
            >
              Locations
            </Link>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Types</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="max-h-[60vh] overflow-y-auto">
                  {typeNames.map((type) => (
                    <DropdownMenuItem key={type}>
                      <Link
                        className="inline-block w-full capitalize"
                        href={`/locations?type=${encodeURIComponent(
                          slug(type)
                        )}`}
                      >
                        {type}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>

            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Dimensions</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="max-h-[60vh] overflow-y-auto">
                  {dimensionNames.map((dimension) => (
                    <DropdownMenuItem key={dimension}>
                      <Link
                        className="inline-block w-full capitalize"
                        href={`/locations?dimension=${encodeURIComponent(
                          slug(dimension)
                        )}`}
                      >
                        {dimension}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </div>
      </DropdownMenu>

      <Link href="/characters" className="py-2">
        Characters
      </Link>
    </nav>
  )
}
