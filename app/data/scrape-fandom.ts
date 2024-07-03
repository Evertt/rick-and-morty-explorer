import "server-only"
import { cache } from "react"
import { JSDOM } from "jsdom"
import { getFirstParagraph, getSectionFromHeading } from "@/lib/utils"

export const scrapeFandom = cache(async (title: string) => {
  const uriEncodedName = encodeURIComponent(title.replace(" ", "_"))

  const fandomPage = await fetch(
    `https://rickandmorty.fandom.com/wiki/${uriEncodedName}`
  )
    .then(
      (res) => res.text(),
      (err) => (console.error(err), `<!DOCTYPE html><p>${err}</p>`)
    )
    .then((html) => new JSDOM(html).window.document)

  const fandomInfo = [...fandomPage.querySelectorAll("#toc > ul > li > a")]
    .slice(0, 3)
    .map((node) => node.getAttribute("href")!.slice(1))
    .map((heading) => getSectionFromHeading(heading, fandomPage))
    .join("\n\n")

  const imageEl = fandomPage.querySelector(
    ".mw-parser-output > aside img"
  ) as HTMLImageElement | null

  const imageBase64 = imageEl
    ? await fetch(imageEl.src.replace(/(^.*?\.jpe?g).*$/, "$1"))
        .then((res) => res.arrayBuffer())
        .then((buffer) => Buffer.from(buffer).toString("base64"))
    : null

  const firstParagraph = getFirstParagraph(fandomPage)

  return { fandomInfo, imageBase64, firstParagraph }
})
