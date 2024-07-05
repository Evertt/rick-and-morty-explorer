import { headers } from "next/headers"
import { getCharacter } from "@/app/data/get-characters"
import Wrapper from "../../Wrapper"

export default async function Page() {
  const headerList = headers()
  const path = headerList.get("x-current-path")!
  const slugParam = path.split("/").at(-1)!
  const character = await getCharacter(slugParam)

  return <Wrapper type="Character" name={character?.name} />
}
