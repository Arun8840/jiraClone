import { getCurrentUser } from "@/components/auth/actions"
import ProjectsList from "@/components/workspaces/Projects/ProjectsList"
import { redirect } from "next/navigation"
import React from "react"

async function Projects() {
  const user = getCurrentUser()

  if (!user) {
    redirect("/sign-in")
  }
  return (
    <div className="sizefull p-2">
      <ProjectsList />
    </div>
  )
}

export default Projects
