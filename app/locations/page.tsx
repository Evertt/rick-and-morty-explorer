"use client"

import { useContext } from "react"
import { useSearchParams } from "next/navigation"
import type { LocationItem } from "../data/get-locations"
import { DataContext } from "../data-provider"
import slug from "slug"

export default function Page() {
  const { locations } = useContext(DataContext)
  const searchParams = useSearchParams()
  const typeSlug = searchParams.get("type")
  const dimensionSlug = searchParams.get("dimension")

  const type =
    typeSlug &&
    Object.keys(locations.types).find((type) => slug(type) === typeSlug)

  const dimension =
    dimensionSlug &&
    Object.keys(locations.dimensions).find(
      (dimension) => slug(dimension) === dimensionSlug
    )

  let filteredLocations: LocationItem[] = []

  if (type && dimension) {
    const correctTypes = Object.values(locations.types[type])
    const correctDimensions = Object.values(locations.dimensions[dimension])
    filteredLocations = correctTypes.filter((type) =>
      correctDimensions.some((dimension) => type.dimension === dimension.dimension)
    )
  } else if (type) {
    filteredLocations = Object.values(locations.types[type])
  } else if (dimension) {
    filteredLocations = Object.values(locations.dimensions[dimension])
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Locations</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredLocations.map((location) => (
          <div key={location.id} className="flex flex-col gap-2">
            <h2 className="text-xl font-bold">{location.name}</h2>
          </div>
        ))}
      </div>
    </div>
  )
}
