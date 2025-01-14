import { getCurrentUser } from "@/components/auth/actions"
import { getWorkspaceInfo } from "@/components/workspaces/actions"
import CreateWorkspaceInviteLinkForm from "@/components/workspaces/components/create-workspace-inviteLink-form"
import { redirect } from "next/navigation"
import React from "react"

interface ParamTypes {
  params: {
    workspaceId: string
    inviteCode: string
  }
}
async function page({ params: { inviteCode, workspaceId } }: ParamTypes) {
  // *AUTH
  const user = await getCurrentUser()
  if (!user) redirect("/sign-in")

  const workspace = await getWorkspaceInfo({ workspaceId })

  if (!workspace) {
    redirect("/")
  }
  return (
    <section className="size-full grid place-items-center">
      <CreateWorkspaceInviteLinkForm
        initialValue={workspace}
        inviteCode={inviteCode}
        workspaceId={workspaceId}
      />
    </section>
  )
}

export default page
