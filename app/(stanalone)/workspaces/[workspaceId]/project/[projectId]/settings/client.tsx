"use client"
import { useDeleteProject } from "@/components/workspaces/Projects/api/use-delete-project"
import { useGetProject } from "@/components/workspaces/Projects/api/use-get-project"
import { useUpdateProject } from "@/components/workspaces/Projects/api/use-update-project"
import ProjectSettings from "@/components/workspaces/Projects/components/Project-settings"
import { useGetParamId } from "@/hooks/use-getParamId"
import ErrorComponent from "@/Utility/Ui/Error-component"
import { Loader } from "@/Utility/Ui/Loader"
import React from "react"

function ProjectId() {
  const { projectId } = useGetParamId()

  const { data: project, isLoading, error } = useGetProject({ projectId })

  if (isLoading) {
    return <Loader />
  }

  if (error || !project) {
    return <ErrorComponent />
  }

  console.log(project)
  return (
    <>
      <ProjectSettings value={project} />
    </>
  )
}

export default ProjectId
