/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query locationsInfo {\n    locations {\n      info {\n        count\n      }\n    }\n  }\n": types.LocationsInfoDocument,
    "\n  query locationsByIds($ids: [ID!]!) {\n    locationsByIds(ids: $ids) {\n      ...LocationItem\n    }\n  }\n": types.LocationsByIdsDocument,
    "\n  fragment LocationItem on Location {\n    id\n    type\n    name\n    dimension\n  }\n": types.LocationItemFragmentDoc,
    "\n  query episodesInfo {\n    episodes {\n      info {\n        count\n      }\n    }\n  }\n": types.EpisodesInfoDocument,
    "\n  query episodesByIds($ids: [ID!]!) {\n    episodesByIds(ids: $ids) {\n      ...EpisodeItem\n    }\n  }\n": types.EpisodesByIdsDocument,
    "\n  fragment EpisodeItem on Episode {\n    id\n    name\n    episode\n    air_date\n  }\n": types.EpisodeItemFragmentDoc,
    "\n  query characterInfo {\n    characters {\n      info {\n        count\n      }\n    }\n  }\n": types.CharacterInfoDocument,
    "\n  query charactersByIds($ids: [ID!]!) {\n    charactersByIds(ids: $ids) {\n      ...CharacterItem\n    }\n  }\n": types.CharactersByIdsDocument,
    "\n  fragment CharacterItem on Character {\n    id\n    name\n    status\n    type\n    image\n    species\n  }\n": types.CharacterItemFragmentDoc,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query locationsInfo {\n    locations {\n      info {\n        count\n      }\n    }\n  }\n"): (typeof documents)["\n  query locationsInfo {\n    locations {\n      info {\n        count\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query locationsByIds($ids: [ID!]!) {\n    locationsByIds(ids: $ids) {\n      ...LocationItem\n    }\n  }\n"): (typeof documents)["\n  query locationsByIds($ids: [ID!]!) {\n    locationsByIds(ids: $ids) {\n      ...LocationItem\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment LocationItem on Location {\n    id\n    type\n    name\n    dimension\n  }\n"): (typeof documents)["\n  fragment LocationItem on Location {\n    id\n    type\n    name\n    dimension\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query episodesInfo {\n    episodes {\n      info {\n        count\n      }\n    }\n  }\n"): (typeof documents)["\n  query episodesInfo {\n    episodes {\n      info {\n        count\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query episodesByIds($ids: [ID!]!) {\n    episodesByIds(ids: $ids) {\n      ...EpisodeItem\n    }\n  }\n"): (typeof documents)["\n  query episodesByIds($ids: [ID!]!) {\n    episodesByIds(ids: $ids) {\n      ...EpisodeItem\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment EpisodeItem on Episode {\n    id\n    name\n    episode\n    air_date\n  }\n"): (typeof documents)["\n  fragment EpisodeItem on Episode {\n    id\n    name\n    episode\n    air_date\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query characterInfo {\n    characters {\n      info {\n        count\n      }\n    }\n  }\n"): (typeof documents)["\n  query characterInfo {\n    characters {\n      info {\n        count\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query charactersByIds($ids: [ID!]!) {\n    charactersByIds(ids: $ids) {\n      ...CharacterItem\n    }\n  }\n"): (typeof documents)["\n  query charactersByIds($ids: [ID!]!) {\n    charactersByIds(ids: $ids) {\n      ...CharacterItem\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CharacterItem on Character {\n    id\n    name\n    status\n    type\n    image\n    species\n  }\n"): (typeof documents)["\n  fragment CharacterItem on Character {\n    id\n    name\n    status\n    type\n    image\n    species\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;