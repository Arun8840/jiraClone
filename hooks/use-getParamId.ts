"use client"

import { useParams } from "next/navigation"

export const useGetParamId = () => {
  const params = useParams()

  const workspaceId = params.workspaceId as string
  const projectId = params.projectId as string
  const taskId = params.taskId as string
  const inviteCode = params.inviteCode as string
  return {
    workspaceId,
    projectId,
    taskId,
    inviteCode,
  }
}
