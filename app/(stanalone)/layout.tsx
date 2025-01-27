import StandaloneHeader from "@/components/layoutComponents/StandaloneHeader"
import React, { ReactNode } from "react"

interface LayoutProps {
  children: ReactNode
}
function StandaloneLayout({ children }: LayoutProps) {
  return (
    <section className="bg-neutral-100 dark:bg-background h-screen overflow-y-auto p-3">
      <div className="container mx-auto h-full flex flex-col">
        <StandaloneHeader />
        <main className="flex-1">{children}</main>
      </div>
    </section>
  )
}

export default StandaloneLayout
