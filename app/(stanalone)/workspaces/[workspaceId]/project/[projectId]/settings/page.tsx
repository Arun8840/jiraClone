import { getCurrentUser } from "@/components/auth/actions"
import { redirect } from "next/navigation"
import React from "react"
import ProjectId from "./client"

async function ProjectSettingPage() {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/sign-in")
  }
  return (
    <>
      <ProjectId />
    </>
  )
}

export default ProjectSettingPage
