"use client"
import { Card } from "@/components/ui/card"
import { useGetWorkspace } from "@/components/workspaces/api/use-get-workspace"
import CreateWorkspaceInviteLinkForm from "@/components/workspaces/components/create-workspace-inviteLink-form"
import { Workspace } from "@/components/workspaces/types"
import { useGetParamId } from "@/hooks/use-getParamId"
import ErrorComponent from "@/Utility/Ui/Error-component"
import { Loader } from "@/Utility/Ui/Loader"
import React from "react"

const JoinIdClient = () => {
  const { workspaceId } = useGetParamId()

  const { data, isPending, error } = useGetWorkspace({ workspaceId })

  if (isPending) {
    return <Loader />
  }
  if (error) {
    return <ErrorComponent />
  }
  return (
    <Card className="lg:w-1/2 mx-auto bg-card p-3 rounded-lg border-none shadow-none">
      <CreateWorkspaceInviteLinkForm initialValue={data as Workspace} />
    </Card>
  )
}

export default JoinIdClient
