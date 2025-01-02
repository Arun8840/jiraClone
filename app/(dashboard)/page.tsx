import { getCurrentUser } from "@/components/auth/actions"
import CreateWorkspaceForm from "@/components/workspaces/components/create-workspace-form"
import WorkspaceLists from "@/components/workspaces/components/Workspace-Lists"
import { redirect } from "next/navigation"

export default async function Home() {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/sign-in")
  }
  return (
    <div className="p-2">
      <CreateWorkspaceForm />
      <WorkspaceLists />
    </div>
  )
}
