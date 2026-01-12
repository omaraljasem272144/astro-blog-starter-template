import type React from "react"
import type { Metadata } from "next"
import { Cairo } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"
import "./globals.css"

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-arabic",
  display: "swap",
})

export const metadata: Metadata = {
  title: "زهراء ريبورت - Zahra Report",
  description: "عينك على الحقيقة.. لحظة بلحظة | Your eye on the truth.. moment by moment",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar">
      <body className={`${cairo.variable} font-sans antialiased bg-background`}>
        {children}
        <Analytics />
        <Script src="https://www.youtube.com/iframe_api" strategy="lazyOnload" />
      </body>
    </html>
  )
}
