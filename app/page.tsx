// app/page.tsx
import { Input, Button } from "@/components/ui"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">
        Welcome to the Rick and Morty Universe
      </h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Search the Multiverse</h2>
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Search for characters, locations, or episodes..."
            className="flex-grow"
          />
          <Button>Search</Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Featured Character</h2>
          {/* Add your featured character component here */}
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Latest Episode</h2>
          {/* Add your latest episode component here */}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">
          Random Location Spotlight
        </h2>
        {/* Add your random location component here */}
      </div>
    </div>
  )
}
