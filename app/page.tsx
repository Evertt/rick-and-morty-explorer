import { getLocations } from "@/app/data/get-locations"
import { getEpisodes } from "@/app/data/get-episodes"
import { getCharacters } from "@/app/data/get-characters"
import slug from "slug"
import Home, { type SearchResults } from "./Home"

export default async function Page() {
  const locations = await getLocations().then((locations) =>
    Object.values(locations.locations).reduce((arr, loc) => {
      arr.push({ label: loc.name, value: `/locations/${slug(loc.name)}` })
      return arr
    }, [] as SearchResults)
  )

  const episodes = await getEpisodes().then((episodes) =>
    Object.entries(episodes).flatMap(([season, seasonEpisodes]) =>
      Object.entries(seasonEpisodes).map(([_, episode], i) => ({
        label: `${episode.name} (Season ${+season})`,
        value: `/season/${+season}/episode/${i + 1}/${slug(episode.name)}`,
      }))
    )
  )
  const characters = await getCharacters().then((characters) =>
    Object.entries(characters).map(([nameSlug, character]) => ({
      label: character.name,
      value: `/characters/${nameSlug}`,
    }))
  )

  const searchResults: SearchResults = [
    ...locations,
    ...episodes,
    ...characters,
  ]

  return <Home searchResults={searchResults} />
}
