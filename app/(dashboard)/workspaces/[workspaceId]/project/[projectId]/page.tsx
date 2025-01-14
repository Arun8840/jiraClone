import { getCurrentUser } from "@/components/auth/actions"
import ProjectDetails from "@/components/workspaces/Projects/components/Project-details"
import { getProject } from "@/components/workspaces/Projects/queries"
import { redirect } from "next/navigation"
import React from "react"

interface ParamTypes {
  params: {
    projectId: string
  }
}
async function page({ params }: ParamTypes) {
  const { projectId } = await params
  const user = await getCurrentUser()
  if (!user) {
    redirect("/sign-in")
  }
  const project = await getProject({
    projectId: projectId,
  })

  if (!project) {
    return (
      <div className="size-full grid place-items-center">
        <h1 className="text-muted-foreground">Project not found !!</h1>
      </div>
    )
  }
  return <ProjectDetails initialValue={project} />
}

export default page
