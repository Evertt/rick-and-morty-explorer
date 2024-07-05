import "server-only"
import slug from "slug"
import { cache } from "react"
import request from "graphql-request"
import { endpoint } from "@/app/constants"
import type { CharacterItemFragment } from "@/app/gql/graphql"
import type { SetNonNullable, ConditionalExcept, Simplify } from "type-fest"
import {
  charactersInfoDocument,
  charactersByIdsDocument,
} from "./docs-and-frags"

type ID = string
type ID_SLUG = string

type RequiredLIF = Required<CharacterItemFragment>
type NullableCharacterItemProps = ConditionalExcept<RequiredLIF, string>
type CharacterItem = Simplify<SetNonNullable<NullableCharacterItemProps>>

export type CharactersCache = {
  [character: ID_SLUG]: CharacterItem
}

export const preload = () => void getCharacters()

export const getCharacter = cache(async (slug: string) => {
  const allCharacters = await getCharacters()
  return allCharacters[slug]
})

export const getCharacters = cache(async () => {
  const resp = await request(endpoint, charactersInfoDocument)

  const count = resp.characters?.info?.count

  if (count == null) {
    throw new Error("Couldn't get the count of characters")
  }

  const characterIds = Array.from({ length: count }, (_, i) => `${i + 1}`)

  return request(endpoint, charactersByIdsDocument, {
    ids: characterIds,
  })
    .then((r) => (r.charactersByIds ?? []) as CharacterItemFragment[])
    .then((characters) =>
      characters
        .filter(
          (character): character is CharacterItem =>
            !!(character.id && character.name)
        )
        .reduce((obj, character) => {
          const slugId = slug(character.name)
          obj[slugId] = character
          return obj
        }, {} as CharactersCache)
    )
})
