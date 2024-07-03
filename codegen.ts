import { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
  schema: "https://rickandmortyapi.com/graphql",
  documents: ["app/**/*.ts", "app/**/*.tsx"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./app/gql/": {
      preset: "client",
    },
  },
}

export default config
