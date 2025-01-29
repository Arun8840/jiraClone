import { getCurrentUser } from "@/components/auth/actions"
import { redirect } from "next/navigation"
import React from "react"
import TaskIdClient from "./client"

const TaskDetail = async () => {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/sign-in")
  }

  return <TaskIdClient />
}

export default TaskDetail
