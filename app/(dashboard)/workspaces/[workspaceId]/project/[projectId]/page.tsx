import { getCurrentUser } from "@/components/auth/actions"
import ProjectDetails from "@/components/workspaces/Projects/components/Project-details"
import { redirect } from "next/navigation"
import React from "react"

async function page() {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/sign-in")
  }
  return (
    <>
      <ProjectDetails />
    </>
  )
}

export default page
