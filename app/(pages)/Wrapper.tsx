import { Suspense } from "react"
import { scrapeFandom } from "../data/scrape-fandom"
import { Skeleton } from "@/components/ui/skeleton"

export type Props = {
  name?: string
  type: string
}

async function Image({
  className = "",
  imgBase64,
  alt,
}: {
  imgBase64: Promise<string | undefined>
  className?: string
  alt: string
}) {
  try {
    const base64 = await imgBase64
    if (!base64) return <div className="hidden" />
    return (
      <img
        className={className}
        src={`data:image/jpeg;base64,${base64}`}
        alt={alt}
      />
    )
  } catch (_) {
    return <div className="hidden" />
  }
}

async function FirstParagraph({
  firstParagraph,
}: {
  firstParagraph: Promise<string>
}) {
  try {
    return <p>{await firstParagraph}</p>
  } catch (_) {
    return <div className="hidden" />
  }
}

async function FandomInfo({ fandomInfo }: { fandomInfo: Promise<string> }) {
  try {
    return (
      <div
        className="contents"
        // I know this looks sketchy, but
        // my `scrapeFandom()` function returns
        // sanitized HTML, so there's no danger here
        dangerouslySetInnerHTML={{ __html: await fandomInfo }}
      ></div>
    )
  } catch (_) {
    return <div className="hidden" />
  }
}

export default function Wrapper({ name, type }: Props) {
  if (!name) return <p className="capitalize">{type} not found</p>

  const { fandomInfo, imageBase64, firstParagraph } = scrapeFandom(name)

  const imgClassName =
    "w-48 h-48 mb-[2em] md:shrink-0 aspect-square object-cover rounded-2xl"

  return (
    <div className="*:prose">
      <div className="!max-w-full flex flex-col has-[:is(p:empty)]:flex-col sm:flex-row items-center sm:gap-8">
        <Suspense fallback={<Skeleton className={imgClassName} />}>
          <Image className={imgClassName} imgBase64={imageBase64} alt={name} />
        </Suspense>
        <div className="has-[:is(p:empty)]:self-start">
          <h1>{name}</h1>
          <Suspense
            fallback={
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            }
          >
            <FirstParagraph firstParagraph={firstParagraph} />
          </Suspense>
        </div>
      </div>
      <Suspense>
        <FandomInfo fandomInfo={fandomInfo} />
      </Suspense>
    </div>
  )
}
