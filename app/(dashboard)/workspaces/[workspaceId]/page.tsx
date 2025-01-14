import { getCurrentUser } from "@/components/auth/actions"
import ProjectsList from "@/components/workspaces/Projects/components/ProjectsList"
import { redirect } from "next/navigation"
import React from "react"

async function page() {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/sign-in")
  }

  return (
    <section className="bg-neutral-50 p-2 size-full">
      <ProjectsList />
    </section>
  )
}

export default page
