"use client"

import type { EpisodesCache } from "./data/get-episodes"
import type { LocationsCache } from "./data/get-locations"
import { createContext } from "react"

export type DataContext = {
  episodes: EpisodesCache
  locations: LocationsCache
}

export const DataContext = createContext<DataContext>({} as DataContext)

export default function DataProvider({
  data,
  children,
}: {
  data: DataContext
  children: React.ReactNode
}) {
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>
}
