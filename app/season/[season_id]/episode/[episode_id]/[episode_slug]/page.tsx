import Episode from "./Episode"
import { getEpisodes } from "@/app/data/get-episodes"

export default async function Page() {
  const episodes = await getEpisodes()

  return <Episode episodes={episodes} />
}
