import { headers } from "next/headers"
import type { LocationsCache } from "@/app/data/get-locations"
import slug from "slug"
import { scrapeFandom } from "@/app/data/scrape-fandom"

export default async function Location({
  locations,
}: {
  locations: LocationsCache
}) {
  const headerList = headers()
  const path = headerList.get("x-current-path")!
  const slugParam = path.split("/").at(-1)!

  const location = Object.values(locations.locations).find(
    (location) => slug(location.name) === slugParam
  )

  if (!location) {
    return <div>Location not found</div>
  }

  console.assert(
    (slugParam as string) === slug(location.name),
    "Hmmm, the slugs don't match. Wrong location?"
  )

  const { fandomInfo, imageBase64, firstParagraph } = await scrapeFandom(
    location.name
  )

  return (
    <div className="*:prose">
      <div className="!max-w-full flex flex-col has-[:is(p:empty)]:flex-col sm:flex-row items-center sm:gap-8">
        {imageBase64 && (
          <img
            className="w-48 h-48 object-cover rounded-2xl"
            src={`data:image/jpeg;base64,${imageBase64}`}
            alt={location.name}
          />
        )}
        <div className="has-[:is(p:empty)]:self-start">
          <h1>{location.name}</h1>
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
