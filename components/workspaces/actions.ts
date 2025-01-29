"use server"
import { DATABASE_ID, MEMBERS_ID, WORKSPACE_ID } from "@/lib/config"
import { getMembers } from "./members/util-get-members"
import { Workspace } from "./types"
import { createSessionClient } from "@/lib/appwrite"
import { Query } from "node-appwrite"

interface GetWorkspaceProps {
  workspaceId: string
}

export const getWorkspaces = async () => {
  try {
    const { account, databases } = await createSessionClient()
    const user = await account.get()
    const members = await databases.listDocuments(DATABASE_ID, MEMBERS_ID, [
      Query.equal("userId", user?.$id),
    ])
    if (members?.total === 0) {
      return { documents: [], total: 0 }
    }

    const workspaceIds = members?.documents?.map((member) => member.workspaceId)
    const workspaces = await databases.listDocuments(
      DATABASE_ID,
      WORKSPACE_ID,
      [Query.orderDesc("$createdAt"), Query.contains("$id", workspaceIds)]
    )

    return workspaces
  } catch (error) {
    return { documents: [], total: 0, error: `${error}` }
  }
}

export const getWorkspace = async ({ workspaceId }: GetWorkspaceProps) => {
  try {
    const { account, databases } = await createSessionClient()
    const user = await account.get()

    const memmbers = await getMembers({
      databases,
      userId: user.$id,
      workspaceId,
    })

    if (!memmbers) {
      return null
    }
    const workspace = await databases.getDocument<Workspace>(
      DATABASE_ID,
      WORKSPACE_ID,
      workspaceId
    )
    return workspace
  } catch {
    return null
  }
}

interface GetWorkspaceInfoProps {
  workspaceId: string
}

export const getWorkspaceInfo = async ({
  workspaceId,
}: GetWorkspaceInfoProps) => {
  try {
    const { databases } = await createSessionClient()

    const workspace = await databases.getDocument<Workspace>(
      DATABASE_ID,
      WORKSPACE_ID,
      workspaceId
    )
    return {
      name: workspace?.name,
    }
  } catch {
    return null
  }
}
