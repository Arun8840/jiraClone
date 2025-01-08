import React, { ReactNode } from "react"

function MembersLayout({ children }: { children: ReactNode }) {
  return (
    <section className="min-h-screen">
      <main>{children}</main>
    </section>
  )
}

export default MembersLayout
