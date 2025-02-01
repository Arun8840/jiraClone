import React from "react"
import WorkspaceIdClientSettings from "./client"
import { getCurrentUser } from "@/components/auth/actions"
import { redirect } from "next/navigation"

async function WorkspaceSettings() {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/sign-in")
  }
  return (
    <>
      <WorkspaceIdClientSettings />
    </>
  )
}

export default WorkspaceSettings
