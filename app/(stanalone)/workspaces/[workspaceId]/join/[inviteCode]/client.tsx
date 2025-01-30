"use client"
import { useGetWorkspace } from "@/components/workspaces/api/use-get-workspace"
import CreateWorkspaceInviteLinkForm from "@/components/workspaces/components/create-workspace-inviteLink-form"
import { Workspace } from "@/components/workspaces/types"
import { useGetParamId } from "@/hooks/use-getParamId"
import ErrorComponent from "@/Utility/Ui/Error-component"
import { Loader } from "@/Utility/Ui/Loader"
import React from "react"

const JoinInviteClient = () => {
  const { inviteCode, workspaceId } = useGetParamId()

  const { data, isLoading, error } = useGetWorkspace({ workspaceId })

  const workspace = data as Workspace

  if (isLoading) {
    return <Loader />
  }

  if (error || !workspace) {
    return <ErrorComponent />
  }
  return (
    <section className="size-full grid place-items-center">
      <CreateWorkspaceInviteLinkForm
        initialValue={{ name: workspace?.name }}
        inviteCode={inviteCode}
        workspaceId={workspaceId}
      />
    </section>
  )
}

export default JoinInviteClient
