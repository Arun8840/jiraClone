import Image from "next/image"
import React from "react"

interface LayoutProps {
  children: React.ReactNode
}
function AuthLayout({ children }: LayoutProps) {
  return (
    <section className="min-h-screen flex flex-col dark:bg-background">
      {children}
    </section>
  )
}

export default AuthLayout
