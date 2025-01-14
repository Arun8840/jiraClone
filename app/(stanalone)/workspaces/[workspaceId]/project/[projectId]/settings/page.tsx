import { getCurrentUser } from "@/components/auth/actions"
import ProjectSettings from "@/components/workspaces/Projects/components/Project-settings"
import { getProject } from "@/components/workspaces/Projects/queries"
import { Projects } from "@/components/workspaces/Projects/type"
import React from "react"

interface SettingParamTypes {
  params: { projectId: string }
}
async function ProjectSettingPage({ params }: SettingParamTypes) {
  const { projectId } = await params

  const user = await getCurrentUser()
  if (!user) {
    return null
  }

  const project = (await getProject({ projectId })) as Projects
  return (
    <div>
      <ProjectSettings value={project} />
    </div>
  )
}

export default ProjectSettingPage
