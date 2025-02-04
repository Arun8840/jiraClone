import React from "react"

interface LayoutProps {
  children: React.ReactNode
}
function StandAloneLayout({ children }: LayoutProps) {
  return (
    <section className="h-screen overflow-y-auto p-3 bg-muted border border-black">
      <main className="container size-full rounded-lg mx-auto p-3">
        {children}
      </main>
    </section>
  )
}

export default StandAloneLayout
