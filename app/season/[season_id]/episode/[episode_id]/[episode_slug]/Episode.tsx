import { headers } from "next/headers"
import type { EpisodesCache } from "@/app/data/get-episodes"
import slug from "slug"
import { scrapeFandom } from "@/app/data/scrape-fandom"

export default async function Episode({
  episodes,
}: {
  episodes: EpisodesCache
}) {
  const headerList = headers()
  const path = headerList.get("x-current-path")!
  const [_, season_id, episode_id, episode_slug] = path.match(
    /season\/(\d+)\/episode\/(\d+)\/([\w-]+)/
  )!

  const season = episodes[season_id]
  const episode = Object.values(season)[+episode_id - 1]
  console.assert(
    slug(episode.name) === episode_slug,
    "Hmmm, the slugs don't match. Wrong episode?"
  )

  const { fandomInfo, imageBase64, firstParagraph } = await scrapeFandom(
    episode.name
  )

  return (
    <div className="*:prose">
      <div className="!max-w-full flex flex-col has-[:is(p:empty)]:flex-col sm:flex-row items-center sm:gap-8">
        {imageBase64 && (
          <img
            className="mx-auto sm:mx-0 aspect-square w-48 h-48 object-cover rounded-2xl"
            src={`data:image/jpeg;base64,${imageBase64}`}
            alt={episode.name}
          />
        )}
        <div className="has-[:is(p:empty)]:self-start">
          <h1>{episode.name}</h1>
          <p>{firstParagraph}</p>
        </div>
      </div>
      <div
        className="contents"
        // I know this looks sketchy, but
        // my `scrapeFandom()` function returns
        // sanitized HTML, so there's no danger here
        dangerouslySetInnerHTML={{ __html: fandomInfo }}
      ></div>
    </div>
  )
}
