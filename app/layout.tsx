import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { QueryProvider } from "@/components/query-provider"
import { CustomCursor } from "@/components/custom-cursor"
import { cn } from "@/lib/utils"

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        fontSans.variable
      )}
    >
      <body className="app-body">
        <CustomCursor />
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}
