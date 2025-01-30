"use client"
import { useGetWorkspace } from "@/components/workspaces/api/use-get-workspace"
import WorkspaceDetail from "@/components/workspaces/components/workspace-detail"
import { Workspace } from "@/components/workspaces/types"
import { useGetParamId } from "@/hooks/use-getParamId"
import ErrorComponent from "@/Utility/Ui/Error-component"
import { Loader } from "@/Utility/Ui/Loader"
import React from "react"

const WorkspaceIdClient = () => {
  const { workspaceId } = useGetParamId()

  const { data, isLoading, error } = useGetWorkspace({ workspaceId })

  const workspace = data as Workspace

  if (isLoading) {
    return <Loader />
  }

  if (error || !workspace) {
    return <ErrorComponent />
  }

  return <WorkspaceDetail value={workspace} />
}

export default WorkspaceIdClient
