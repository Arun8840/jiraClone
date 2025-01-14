import { getCurrentUser } from "@/components/auth/actions"
import { getWorkspace } from "@/components/workspaces/actions"
import WorkspaceDetail from "@/components/workspaces/components/workspace-detail"
import { Workspace } from "@/components/workspaces/types"
import React from "react"

interface ParamTypes {
  params: { workspaceId: string }
}
async function WorkspaceSetting({ params }: ParamTypes) {
  const { workspaceId } = await params
  const user = await getCurrentUser()
  if (!user) {
    return null
  }

  const workspace = (await getWorkspace({ workspaceId })) as Workspace
  return (
    <div>
      <WorkspaceDetail value={workspace} />
    </div>
  )
}

export default WorkspaceSetting
