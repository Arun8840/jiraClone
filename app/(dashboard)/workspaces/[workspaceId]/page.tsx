import { getCurrentUser } from "@/components/auth/actions"
import { getWorkspace } from "@/components/workspaces/actions"
import WorkspaceDetail from "@/components/workspaces/components/workspace-detail"
import ProjectsList from "@/components/workspaces/Projects/ProjectsList"
import { redirect } from "next/navigation"
import React from "react"

interface ParamType {
  params: { workspaceId: string }
}

async function page({ params }: ParamType) {
  const { workspaceId } = await params // Destructure after receiving params
  const user = await getCurrentUser()
  if (!user) {
    redirect("/sign-in")
  }

  const initialValue = await getWorkspace({ workspaceId })
  if (!initialValue) {
    return (
      <div className="size-full grid place-items-center">
        <h1>Workspace Not Found</h1>
      </div>
    )
  }

  return (
    <section className="bg-neutral-50 p-2 grid gap-2">
      <ProjectsList workspaceId={workspaceId} />
      <WorkspaceDetail value={initialValue} />
    </section>
  )
}

export default page
