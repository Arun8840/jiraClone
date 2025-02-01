import { getCurrentUser } from "@/components/auth/actions"
import React from "react"
import WorkspaceIdClient from "./client"
import { redirect } from "next/navigation"

async function WorkspaceSetting() {
  const user = await getCurrentUser()
  if (!user) {
    return redirect("/sign-in")
  }

  return (
    <>
      <WorkspaceIdClient />
    </>
  )
}

export default WorkspaceSetting
