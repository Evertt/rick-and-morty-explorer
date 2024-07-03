import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isElement(node: Node): node is Element {
  return node.nodeType === 1 // Node.ELEMENT_NODE
}

export function isText(node: Node): node is Text {
  return node.nodeType === 3 // Node.TEXT_NODE
}

export function getFirstParagraph(document: Document) {
  const element = document.querySelector(".mw-parser-output")
  if (!element) return ""

  let directText = ""
  for (let node of element.childNodes) {
    if (isElement(node) && ["A", "B"].includes(node.tagName)) {
      directText += node.textContent ?? ""
    }

    if (isText(node)) {
      directText += node.textContent ?? ""
    }
  }

  return directText.replace(/^\s+|\s+$/g, "")
}

export function getSectionFromHeading(heading: string, document: Document) {
  const headingEl = document.querySelector(`h2:has(#${heading})`)
  const paragraphs = [`<h2>${heading.replace("_", " ")}</h2>`]

  if (headingEl) {
    let currentElement = headingEl.nextElementSibling

    while (currentElement && currentElement.tagName !== "H2") {
      if (currentElement.tagName === "P") {
        const textContent = currentElement.textContent?.replace(/^\s+$/, "")
        console.log("textContent is", textContent)
        if (!textContent) {
          currentElement = currentElement.nextElementSibling
          continue
        }
        paragraphs.push(`<p>${currentElement.textContent}</p>`)
      }
      if (currentElement.tagName === "UL") {
        const listItems = [...currentElement.querySelectorAll("li")]
          .map((listItem) => `<li>${listItem.textContent}</li>`)
          .join("\n")
        paragraphs.push(`<p><ul>\n${listItems}\n</ul></p>`)
      }
      currentElement = currentElement.nextElementSibling
    }
  }

  if (paragraphs.length && !paragraphs.at(-1)!.startsWith("<p>")) {
    paragraphs.pop()
  }

  // Remove the [1] references from the end of the paragraphs
  return paragraphs.join("\n\n").replace(/\[\d+\]/g, "")
}