"use client"
import { useGetProject } from "@/components/workspaces/Projects/api/use-get-project"
import ProjectSettings from "@/components/workspaces/Projects/components/Project-settings"
import { Projects } from "@/components/workspaces/Projects/type"
import { useGetParamId } from "@/hooks/use-getParamId"
import { Loader } from "@/Utility/Ui/Loader"
import React from "react"

function ProjectIdClientSettings() {
  const { projectId } = useGetParamId()
  const { data: project, isLoading } = useGetProject({ projectId })

  if (isLoading) {
    return <Loader />
  }
  return (
    <>
      <ProjectSettings initialValue={project as Projects} />
    </>
  )
}

export default ProjectIdClientSettings
