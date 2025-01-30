import { getCurrentUser } from "@/components/auth/actions"
import { redirect } from "next/navigation"
import React from "react"
import JoinInviteClient from "./client"

async function page() {
  // *AUTH
  const user = await getCurrentUser()
  if (!user) redirect("/sign-in")

  return <JoinInviteClient />
}

export default page
