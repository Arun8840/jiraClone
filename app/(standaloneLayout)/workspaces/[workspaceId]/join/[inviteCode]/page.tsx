import React from "react"
import { getCurrentUser } from "@/components/auth/actions"
import { redirect } from "next/navigation"
import CreateWorkspaceInviteLinkForm from "@/components/workspaces/components/create-workspace-inviteLink-form"

async function page() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/sign-in")
  }

  return (
    <div className="size-full grid place-items-center">
      <CreateWorkspaceInviteLinkForm />
    </div>
  )
}

export default page
