import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import Providers from "@/components/query-provider"
import { Toaster } from "@/components/ui/toaster"
import { NuqsAdapter } from "nuqs/adapters/next/app"

const poppins_normal = Poppins({
  weight: "400",
  display: "block",
  variable: "--font-poppins-normal",
  subsets: ["latin"],
})
const poppins_bold = Poppins({
  weight: "500",
  display: "block",
  variable: "--font-poppins-bold",
  subsets: ["latin"],
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
        <Providers>
          <NuqsAdapter>{children}</NuqsAdapter>
        </Providers>
        <Toaster />
      </body>
    </html>
  )
}
