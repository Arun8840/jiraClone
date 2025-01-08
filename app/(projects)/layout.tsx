import React, { ReactNode } from "react"

function ProjectsLayout({ children }: { children: ReactNode }) {
  return (
    <section className="min-h-screen">
      <main>{children}</main>
    </section>
  )
}

export default ProjectsLayout
