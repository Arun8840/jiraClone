import { getCurrentUser } from "@/components/auth/actions"
import SignUpComponent from "@/components/auth/sign-up"
import { redirect } from "next/navigation"
import React from "react"

const SignUpPage = async () => {
  const user = await getCurrentUser()
  if (user) {
    redirect("/")
  }
  return <SignUpComponent />
}

export default SignUpPage
