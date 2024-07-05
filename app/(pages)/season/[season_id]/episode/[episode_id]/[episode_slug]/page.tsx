import { getEpisode } from "@/app/data/get-episodes"
import { headers } from "next/headers"
import slug from "slug"
import Wrapper from "@/app/(pages)/Wrapper"

export default async function Page() {
  const headerList = headers()
  const path = headerList.get("x-current-path")!
  const [_, season_id, episode_id, episode_name_slug] = path.match(
    /season\/(\d+)\/episode\/(\d+)\/([\w-]+)/
  )!

  const episode = await getEpisode(season_id, episode_id)

  console.assert(
    slug(episode.name) === episode_name_slug,
    "Hmmm, the slugs don't match. Wrong episode?"
  )

  return <Wrapper type="Episode" name={episode.name} />
}
