import { getCurrentUser } from "@/components/auth/actions"
import { redirect } from "next/navigation"
import React from "react"
import { WorkspaceIdClient } from "./client"

async function page() {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/sign-in")
  }

  return (
    <>
      <WorkspaceIdClient />
    </>
  )
}

export default page
