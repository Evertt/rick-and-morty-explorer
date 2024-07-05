import "server-only"
import { cache } from "react"
import { JSDOM } from "jsdom"
import { getFirstParagraph, getSectionFromHeading } from "@/lib/utils"

export const scrapeFandom = cache((title: string) => {
  const uriEncodedName = encodeURIComponent(title.replace(" ", "_"))

  const fandomPage = fetch(
    `https://rickandmorty.fandom.com/wiki/${uriEncodedName}`
  )
    .then(
      (res) => res.text(),
      (err) => (console.error(err), `<!DOCTYPE html><p>${err}</p>`)
    )
    .then((html) => new JSDOM(html).window.document)

  const fandomInfo = fandomPage.then((doc) => {
    return [...doc.querySelectorAll("#toc > ul > li > a")]
      .slice(0, 3)
      .map((node) => node.getAttribute("href")!.slice(1))
      .map((heading) => getSectionFromHeading(heading, doc))
      .join("\n\n")
  })

  const imageBase64 = fandomPage
    .then(
      (doc) =>
        doc.querySelector(
          ".mw-parser-output > aside img"
        ) as HTMLImageElement | null
    )
    .then((imageEl) =>
      imageEl
        ? fetch(imageEl.src.replace(/(^.*?\.jpe?g).*$/, "$1"))
            .then((res) => res.arrayBuffer())
            .then((buffer) => Buffer.from(buffer).toString("base64"))
        : undefined
    )

  const firstParagraph = fandomPage.then((doc) => getFirstParagraph(doc))

  return { fandomInfo, imageBase64, firstParagraph }
})
