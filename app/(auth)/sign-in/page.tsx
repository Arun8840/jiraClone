import { getCurrentUser } from "@/components/auth/actions"
import SignInComponent from "@/components/auth/sign-in"
import { redirect } from "next/navigation"
import React from "react"

const SingnInPage = async () => {
  const user = await getCurrentUser()
  if (user) {
    redirect("/")
  }
  return <SignInComponent />
}

export default SingnInPage
