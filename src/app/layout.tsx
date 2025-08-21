import type React from "react"
import "./globals.css"
import { Inter, Montserrat, Playfair_Display } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" })
const playfairDisplay = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })

export const metadata = {
  title: "East Gate Jax",
  description: "A missional community living upon the basis of the eternal covenant of Jesus Christ",
  generator: 'v0.dev',
  icons: {
    icon: [
      {
        url: '/favicon-16x16.svg',
        sizes: '16x16',
        type: 'image/svg+xml',
      },
      {
        url: '/favicon.svg',
        sizes: '32x32',
        type: 'image/svg+xml',
      },
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

  return (
    <html lang="en">
      <head>
        {mapboxToken && <link href="https://api.mapbox.com/mapbox-gl-js/v2.9.1/mapbox-gl.css" rel="stylesheet" />}
      </head>
      <body className={`${inter.className} ${montserrat.variable} ${playfairDisplay.variable}`} suppressHydrationWarning={true}>
          {children}
      </body>
    </html>
  )
}



import './globals.css'