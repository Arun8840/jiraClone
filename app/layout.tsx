import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import Providers from "@/components/query-provider"

const poppins_normal = Poppins({
  weight: "400",
  display: "block",
  variable: "--font-poppins-normal",
})
const poppins_bold = Poppins({
  weight: "500",
  display: "block",
  variable: "--font-poppins-bold",
})

export const metadata: Metadata = {
  title: "Jira",
  description: "creating jira clone application",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${poppins_normal.variable} ${poppins_bold.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
