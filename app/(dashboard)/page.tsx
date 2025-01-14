import { getCurrentUser } from "@/components/auth/actions"
import { getWorkspaces } from "@/components/workspaces/actions"
import { redirect } from "next/navigation"

export default async function Home() {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/sign-in")
  }
  const workspaces = await getWorkspaces()

  if (workspaces?.total === 0) {
    return null
  } else {
    redirect(`/workspaces/${workspaces?.documents[0]?.$id}`)
  }
}
