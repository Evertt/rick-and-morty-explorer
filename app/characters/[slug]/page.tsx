import { Suspense } from "react"
import Character from "./Character"
import { getCharacters } from "@/app/data/get-characters"

export default async function Page() {
  const characters = await getCharacters()

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Character characters={characters} />
    </Suspense>
  )
}
