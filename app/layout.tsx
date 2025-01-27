import type { Metadata } from "next"
import { Open_Sans } from "next/font/google"
import "./globals.css"
import Providers from "@/components/query-provider"
import { Toaster } from "@/components/ui/toaster"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import { ThemeProvider } from "@/Utility/theme-provider"

const poppins_normal = Open_Sans({
  weight: "400",
  display: "block",
  variable: "--font-poppins-normal",
  subsets: ["latin"],
})
const poppins_bold = Open_Sans({
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
      <body
        className={`${poppins_normal.variable} ${poppins_bold.variable} bg-white dark:bg-black`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <NuqsAdapter>{children}</NuqsAdapter>
          </Providers>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
