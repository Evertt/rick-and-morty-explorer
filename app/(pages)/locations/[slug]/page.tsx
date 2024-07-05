import { headers } from "next/headers"
import { getLocation } from "@/app/data/get-locations"
import Wrapper from "../../Wrapper"

export default async function Page() {
  const headerList = headers()
  const path = headerList.get("x-current-path")!
  const slugParam = path.split("/").at(-1)!
  const location = await getLocation(slugParam)

  return <Wrapper type="Location" name={location?.name} />
}
