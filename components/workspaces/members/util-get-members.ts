import { DATABASE_ID, MEMBERS_ID } from "@/lib/config"
import { Databases, Query } from "node-appwrite"

interface ArgTypes {
  databases: Databases
  workspaceId: string
  userId: string
}

export const getMembers = async ({
  databases,
  userId,
  workspaceId,
}: ArgTypes) => {
  const members = await databases.listDocuments(DATABASE_ID, MEMBERS_ID, [
    Query.equal("workspaceId", workspaceId),
    Query.equal("userId", userId),
  ])

  return members.documents[0]
}
