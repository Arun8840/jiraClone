import { getCurrentUser } from "@/components/auth/actions"
import MembersList from "@/components/members/components/members-list"
import { redirect } from "next/navigation"
import React from "react"

async function WorkspaceMembersPage() {
  const user = getCurrentUser()

  if (!user) {
    redirect("/sign-in")
  }
  return (
    <section className="size-full p-2">
      <MembersList />
    </section>
  )
}

export default WorkspaceMembersPage
