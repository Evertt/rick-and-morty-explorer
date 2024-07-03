import { graphql } from "@/app/gql"

export const locationsInfoDocument = graphql(`
  query locationsInfo {
    locations {
      info {
        count
      }
    }
  }
`)

export const locationsByIdsDocument = graphql(`
  query locationsByIds($ids: [ID!]!) {
    locationsByIds(ids: $ids) {
      ...LocationItem
    }
  }
`)

export const LocationFragment = graphql(`
  fragment LocationItem on Location {
    id
    type
    name
    dimension
  }
`)

export const episodesInfoDocument = graphql(`
  query episodesInfo {
    episodes {
      info {
        count
      }
    }
  }
`)

export const episodesByIdsDocument = graphql(`
  query episodesByIds($ids: [ID!]!) {
    episodesByIds(ids: $ids) {
      ...EpisodeItem
    }
  }
`)

export const EpisodeFragment = graphql(`
  fragment EpisodeItem on Episode {
    id
    name
    episode
    air_date
  }
`)
