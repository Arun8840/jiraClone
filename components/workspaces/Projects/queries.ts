import { createSessionClient } from "@/lib/appwrite"
import { getMembers } from "../members/util-get-members"
import { Projects } from "./type"
import { DATABASE_ID, PROJECTS_ID, WORKSPACE_ID } from "@/lib/config"

interface GetProjectTypes {
  projectId: string
}
export const getProject = async ({ projectId }: GetProjectTypes) => {
  try {
    const { account, databases } = await createSessionClient()
    const user = await account.get()
    const projects = await databases.getDocument<Projects>(
      DATABASE_ID,
      PROJECTS_ID,
      projectId
    )
    const memmbers = await getMembers({
      databases,
      userId: user.$id,
      workspaceId: projects?.workspaceId,
    })

    if (!memmbers) {
      return null
    }
    return projects
  } catch {
    return null
  }
}
