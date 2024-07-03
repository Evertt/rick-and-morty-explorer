import { Suspense } from "react"
import Location from "./Location"
import { getLocations } from "@/app/data/get-locations"

export default async function Page() {
  const locations = await getLocations()

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Location locations={locations} />
    </Suspense>
  )
}
