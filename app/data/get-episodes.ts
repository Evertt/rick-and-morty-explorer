import "server-only"
import slug from "slug"
import { cache } from "react"
import request from "graphql-request"
import { endpoint } from "@/app/constants"
import type { EpisodeItemFragment } from "@/app/gql/graphql"
import type { SetNonNullable, ConditionalExcept, Simplify } from "type-fest"
import { episodesInfoDocument, episodesByIdsDocument } from "./docs-and-frags"

type ID = string
type ID_SLUG = string

type RequiredLIF = Required<EpisodeItemFragment>
type NullableEpisodeItemProps = ConditionalExcept<RequiredLIF, string>
type EpisodeItem = Simplify<SetNonNullable<NullableEpisodeItemProps>>

export type EpisodesCache = {
  [season: ID]: {
    [episode: ID_SLUG]: EpisodeItem
  }
}

export const preload = () => void getEpisodes()

export const getEpisodes = cache(async () => {
  const resp = await request(endpoint, episodesInfoDocument)

  const count = resp.episodes?.info?.count

  if (count == null) {
    throw new Error("Couldn't get the count of episodes")
  }

  const episodeIds = Array.from({ length: count }, (_, i) => `${i + 1}`)

  return await request(endpoint, episodesByIdsDocument, {
    ids: episodeIds,
  })
    .then((r) => (r.episodesByIds ?? []) as EpisodeItemFragment[])
    .then((episodes) =>
      episodes
        .filter(
          (episode): episode is EpisodeItem => !!(episode.id && episode.name)
        )
        .reduce((obj, episode) => {
          const seasonNumber = episode.episode[2]

          if (!obj[seasonNumber]) {
            obj[seasonNumber] = {}
          }

          const slugId = slug(`${episode.id}-${episode.name}`)
          obj[seasonNumber][slugId] = episode
          return obj
        }, {} as EpisodesCache)
    )
})
