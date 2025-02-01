import React from "react"
import { NewWorkspaceForm } from "./client"

function WorkspaceCreate() {
  return (
    <div className="p-4 rounded-lg bg-card font-poppins_normal grid auto-rows-max gap-2">
      <h1 className="text-2xl font-semibold ">Welcome to Jira Clone</h1>
      <h2 className=" font-medium">Create Your Workspace</h2>
      <p className="text-muted-foreground text-sm ">
        Give your team the power to collaborate and achieve more. Create a
        workspace to start managing projects and tracking progress.
      </p>
      <NewWorkspaceForm />
    </div>
  )
}

export default WorkspaceCreate
