"use client"
import { useGetWorkspace } from "@/components/workspaces/api/use-get-workspace"
import WorkspaceSettings from "@/components/workspaces/components/Workspace-settings"
import { Workspace } from "@/components/workspaces/types"
import { useGetParamId } from "@/hooks/use-getParamId"
import ErrorComponent from "@/Utility/Ui/Error-component"
import { Loader } from "@/Utility/Ui/Loader"
import React from "react"

function WorkspaceIdClientSettings() {
  const { workspaceId } = useGetParamId()
  const { data: initialValue, isLoading } = useGetWorkspace({ workspaceId })

  if (isLoading) {
    return <Loader />
  }
  if (!initialValue) {
    return <ErrorComponent />
  }

  return (
    <>
      <WorkspaceSettings initialValue={initialValue as Workspace} />
    </>
  )
}

export default WorkspaceIdClientSettings
