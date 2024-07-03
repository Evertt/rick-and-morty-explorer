import { cache } from "react"
import request from "graphql-request"
import { endpoint } from "@/app/constants"
import type { LocationItemFragment } from "@/app/gql/graphql"
import type { SetNonNullable, ConditionalExcept, Simplify } from "type-fest"
import { locationsInfoDocument, locationsByIdsDocument } from "./docs-and-frags"

type ID = string

type RequiredLIF = Required<LocationItemFragment>
type NullableLocationItemProps = ConditionalExcept<RequiredLIF, string>
export type LocationItem = Simplify<SetNonNullable<NullableLocationItemProps>>

export type LocationsCache = {
  locations: {
    [id: ID]: LocationItem
  }
  types: {
    [type: string]: {
      [id: ID]: LocationItem
    }
  }
  dimensions: {
    [dimension: string]: {
      [id: ID]: LocationItem
    }
  }
}

export const preload = () => void getLocations()

export const getLocations = cache(async () => {
  const types = new Map<string, LocationsCache["locations"]>()
  const dimensions = new Map<string, LocationsCache["locations"]>()

  const resp = await request(endpoint, locationsInfoDocument)

  const count = resp.locations?.info?.count

  if (count == null) {
    throw new Error("Couldn't get the count of locations")
  }

  const locationIds = Array.from({ length: count }, (_, i) => `${i + 1}`)

  const locations = await request(endpoint, locationsByIdsDocument, {
    ids: locationIds,
  })
    .then((r) => (r.locationsByIds ?? []) as LocationItemFragment[])
    .then((locations) =>
      locations
        .filter(
          (loc): loc is LocationItem =>
            !!(loc.id && (loc?.type || loc?.dimension))
        )
        .reduce((obj, loc) => {
          obj[loc.id] = loc
          return obj
        }, {} as LocationsCache["locations"])
    )

  for (const key in locations) {
    const location = locations[key]

    // Sometimes a location.type is an empty string,
    // which I prefer to filter out, because I can't use it
    // to filter for locations of that type later.
    // Luckily enough, every location with an empty type has a non-empty dimension.
    if (location.type) {
      const type = types.get(location.type) ?? {}
      type[location.id] = location
      types.set(location.type, type)
    }

    // The same goes for locations with an empty dimension string.
    if (location.dimension) {
      const dimension = dimensions.get(location.dimension) ?? {}
      dimension[location.id] = location
      dimensions.set(location.dimension, dimension)
    }
  }

  return {
    locations,
    types: Object.fromEntries(types.entries()),
    dimensions: Object.fromEntries(dimensions.entries()),
  } satisfies LocationsCache
})
