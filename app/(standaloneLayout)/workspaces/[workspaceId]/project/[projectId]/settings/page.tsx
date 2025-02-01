import React from "react"
import ProjectIdClientSettings from "./client"
import { getCurrentUser } from "@/components/auth/actions"
import { redirect } from "next/navigation"

async function page() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/sign-in")
  }
  return (
    <>
      <ProjectIdClientSettings />
    </>
  )
}

export default page
