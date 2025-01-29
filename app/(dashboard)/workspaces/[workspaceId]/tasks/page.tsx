import { getCurrentUser } from "@/components/auth/actions"
import TaskViewer from "@/components/Task/Task-viewer"
import { redirect } from "next/navigation"
import React from "react"

const Taskpage = async () => {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/sign-in")
  }
  return (
    <div className="size-full p-2">
      <TaskViewer />
    </div>
  )
}

export default Taskpage
