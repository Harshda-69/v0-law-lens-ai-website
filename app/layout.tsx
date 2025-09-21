import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Suspense } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LawLens - AI-Powered Legal Assistant",
  description: "Your AI-powered legal assistant for document analysis, risk assessment, and legal insights",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} font-sans`}>
        <Navigation />
        <Suspense fallback={null}>{children}</Suspense>
        <Footer />
      </body>
    </html>
  )
}
