import { getCurrentUser } from "@/components/auth/actions"
import { redirect } from "next/navigation"
import React from "react"

async function page() {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/sign-in")
  }

  return <section className="p-2 size-full">Overall home page</section>
}

export default page
