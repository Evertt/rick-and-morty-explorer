import "server-only"
import { cache } from "react"
import request from "graphql-request"
import { endpoint } from "@/app/constants"
import type { LocationItemFragment } from "@/app/gql/graphql"
import type { SetNonNullable, ConditionalExcept, Simplify } from "type-fest"
import { locationsInfoDocument, locationsByIdsDocument } from "./docs-and-frags"
import slug from "slug"

type Slug = string

type RequiredLIF = Required<LocationItemFragment>
type NullableLocationItemProps = ConditionalExcept<RequiredLIF, string>
export type LocationItem = Simplify<SetNonNullable<NullableLocationItemProps>>

export type LocationsCache = {
  locations: {
    [slug: Slug]: LocationItem
  }
  types: {
    [type: string]: {
      [slug: Slug]: LocationItem
    }
  }
  dimensions: {
    [dimension: string]: {
      [slug: Slug]: LocationItem
    }
  }
}

export const preload = () => void getLocations()

export const getLocation = cache(async (slug: string) => {
  const allLocations = await getLocations()
  return allLocations.locations[slug]
})

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
            !!(loc.name && (loc?.type || loc?.dimension))
        )
        .reduce((obj, loc) => {
          obj[slug(loc.name)] = loc
          return obj
        }, {} as LocationsCache["locations"])
    )

  for (const slug in locations) {
    const location = locations[slug]

    // Sometimes a location.type is an empty string,
    // which I prefer to filter out, because I can't use it
    // to filter for locations of that type later.
    // Luckily enough, every location with an empty type has a non-empty dimension.
    if (location.type) {
      const type = types.get(location.type) ?? {}
      type[slug] = location
      types.set(location.type, type)
    }

    // The same goes for locations with an empty dimension string.
    if (location.dimension) {
      const dimension = dimensions.get(location.dimension) ?? {}
      dimension[slug] = location
      dimensions.set(location.dimension, dimension)
    }
  }

  return {
    locations,
    types: Object.fromEntries(types.entries()),
    dimensions: Object.fromEntries(dimensions.entries()),
  } satisfies LocationsCache
})
