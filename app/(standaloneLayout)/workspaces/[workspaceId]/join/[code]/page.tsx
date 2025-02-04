import React from "react"
import JoinIdClient from "./client"
import { getCurrentUser } from "@/components/auth/actions"
import { redirect } from "next/navigation"

async function page() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/sign-in")
  }
  return (
    <div className="size-full grid place-items-center">
      <JoinIdClient />
    </div>
  )
}

export default page
