import "./globals.css"
import type { Metadata } from "next"
import { Navbar } from "@/components/Navbar"
import DataContextProvider from "./data-provider"
// import Providers from "./providers"
import { Inter as FontSans } from "next/font/google"
import { getLocations } from "./data/get-locations"
import { getEpisodes } from "./data/get-episodes"

import { cn } from "@/lib/utils"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const episodes = await getEpisodes()
  const locations = await getLocations()
  const typeNames = Object.keys(locations.types)
  const dimensionNames = Object.keys(locations.dimensions)

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
            typeNames={typeNames}
            dimensionNames={dimensionNames}
          />
        </header>
        <main>
          <DataContextProvider data={{ episodes, locations }}>
            {children}
          </DataContextProvider>
        </main>
      </body>
    </html>
  )
}
