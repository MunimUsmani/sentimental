import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import Navbar from "@/app/components/navbar"
import Footer from "@/app/components/footer"

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins'
})

export const metadata: Metadata = {
  title: "Memory Sharing - Preserve Your Precious Moments",
  description: "A platform for sharing and preserving memories through photos, blogs, and recipes",
  keywords: ["memories", "photo gallery", "blog", "recipe book", "elderly", "family sharing"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className} min-h-screen flex flex-col`}>
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
          <Footer />
      </body>
    </html>
  )
}