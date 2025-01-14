"use client"

import { useParams } from "next/navigation"

export const useGetParamId = () => {
  const params = useParams()

  const workspaceId = params.workspaceId as string
  const projectId = params.projectId as string
  return {
    workspaceId,
    projectId,
  }
}
