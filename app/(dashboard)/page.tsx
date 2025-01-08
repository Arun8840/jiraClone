import { getCurrentUser } from "@/components/auth/actions"
import WorkspaceLists from "@/components/workspaces/components/Workspace-Lists"
import { redirect } from "next/navigation"

export default async function Home() {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/sign-in")
  }
  return (
    <div className="p-2">
      <WorkspaceLists />
    </div>
  )
}
