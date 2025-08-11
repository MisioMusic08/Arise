import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/components/cart-context" // Import CartProvider

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Chennai Public School - Commerce Expo 2025",
  description:
    "Everything Platform for your commerce - Chennai Public School Commerce Expo featuring innovative student projects, premium marketplace, and comprehensive business education solutions.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>{children}</CartProvider> {/* Wrap children with CartProvider */}
      </body>
    </html>
  )
}
