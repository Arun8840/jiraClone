import React from "react"
import { getCurrentUser } from "@/components/auth/actions"
import { Loader } from "@/Utility/Ui/Loader"
import MembersList from "@/components/members/components/members-list"

async function MembersPage() {
  const user = await getCurrentUser()
  if (!user) {
    return <Loader />
  }
  return (
    <div className="size-full">
      <MembersList />
    </div>
  )
}

export default MembersPage
