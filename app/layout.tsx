import "./globals.css"
import type { Metadata } from "next"
import { Navbar } from "@/components/Navbar"
import { Inter as FontSans } from "next/font/google"
import { getLocations } from "./data/get-locations"
import { getEpisodes } from "./data/get-episodes"
import { getCharacters } from "./data/get-characters"

import { cn } from "@/lib/utils"
import { Suspense } from "react"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Rick and Morty Explorer",
  description: "Explore the universe of Rick and Morty",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const episodes = await getEpisodes()
  const locations = await getLocations()
  const characters = await getCharacters()

  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background text-foreground font-sans antialiased",
          fontSans.variable
        )}
      >
        <header className="bg-gray-800 text-white p-4">
          <Navbar
            episodes={episodes}
            types={locations.types}
            dimensions={locations.dimensions}
            characters={characters}
          />
        </header>
        <main className="container mx-auto sm:px-16 py-8 md:max-w-prose lg:max-w-screen-lg">
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </main>
      </body>
    </html>
  )
}
