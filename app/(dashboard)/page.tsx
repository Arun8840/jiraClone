import { getCurrentUser } from "@/components/auth/actions"
import { getWorkspaces } from "@/components/workspaces/actions"
import { redirect } from "next/navigation"

export default async function Home() {
  const user = await getCurrentUser()
  const workspaces = await getWorkspaces()

  if (!user) {
    redirect("/sign-in")
  }

  if (workspaces.total !== 0 && workspaces.documents.length > 0) {
    redirect(`/workspaces/${workspaces.documents[0].$id}`)
  } else {
    redirect(`/workspaces/create`)
  }
}
