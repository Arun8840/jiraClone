import { getMembers } from "@/components/workspaces/members/util-get-members"
import { createAdminClient } from "@/lib/appwrite"
import { DATABASE_ID, MEMBERS_ID } from "@/lib/config"
import { sessionMiddleware } from "@/lib/session-middleware"
import { MemberRole } from "@/models/RoleTypes"
import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import { Query } from "node-appwrite"
import { z } from "zod"

const app = new Hono()

  // * LOAD LINKED MEMEBERS
  .get(
    "/",
    sessionMiddleware,
    zValidator("query", z.object({ workspaceId: z.string() })),
    async (c) => {
      const { users } = await createAdminClient()
      const databases = c.get("databases")
      const user = c.get("user")
      const { workspaceId } = c.req.valid("query")

      const member = await getMembers({
        databases,
        userId: user.$id,
        workspaceId,
      })

      if (!member) {
        return c.json({ error: "Unauthorized" }, 401)
      }

      const members = await databases.listDocuments(DATABASE_ID, MEMBERS_ID, [
        Query.equal("workspaceId", workspaceId),
      ])

      const populatedMembers = await Promise.all(
        members.documents.map(async (member) => {
          const user = await users.get(member.userId)
          return {
            ...member,
            name: user.name,
            email: user.email,
          }
        })
      )

      return c.json({ data: { ...members, document: populatedMembers } })
    }
  )

  // ! DELETE LINKED WORKSPACE MEMBER
  .delete(
    "/:memberId",
    sessionMiddleware,

    async (c) => {
      const { memberId } = c.req.param()
      const user = c.get("user")
      const databases = c.get("databases")

      const memberToDelete = await databases.getDocument(
        DATABASE_ID,
        MEMBERS_ID,
        memberId
      )

      const allMembersInWorkspace = await databases.listDocuments(
        DATABASE_ID,
        MEMBERS_ID,
        [Query.equal("workspaceId", memberToDelete.workspaceId)]
      )

      const member = await getMembers({
        databases,
        userId: user.$id,
        workspaceId: memberToDelete.workspaceId,
      })

      if (!member) {
        return c.json({ error: "Unauthorized" }, 401)
      }
      if (
        member.$id !== memberToDelete.$id &&
        member.role !== MemberRole.ADMIN
      ) {
        return c.json({ error: "Unauthorized" }, 401)
      }

      if (allMembersInWorkspace.total === 1) {
        return c.json({ error: "Cannot delete the only member" }, 400)
      }

      await databases.deleteDocument(DATABASE_ID, MEMBERS_ID, memberId)

      return c.json({
        data: { $id: memberToDelete.$id },
        message: "Member deleted succesfully!!s",
      })
    }
  )

  //   *UPDATE MEMBER
  .patch(
    "/:memberId",
    sessionMiddleware,
    zValidator("json", z.object({ role: z.nativeEnum(MemberRole) })),
    async (c) => {
      const { memberId } = c.req.param()
      const user = c.get("user")
      const databases = c.get("databases")
      const { role } = c.req.valid("json")
      const memberToUpdate = await databases.getDocument(
        DATABASE_ID,
        MEMBERS_ID,
        memberId
      )

      const allMembersInWorkspace = await databases.listDocuments(
        DATABASE_ID,
        MEMBERS_ID,
        [Query.equal("workspaceId", memberToUpdate.workspaceId)]
      )

      const member = await getMembers({
        databases,
        userId: user.$id,
        workspaceId: memberToUpdate.workspaceId,
      })

      if (!member) {
        return c.json({ error: "Unauthorized" }, 401)
      }
      if (
        member.$id !== memberToUpdate.$id &&
        member.role !== MemberRole.ADMIN
      ) {
        return c.json({ error: "Unauthorized" }, 401)
      }

      if (allMembersInWorkspace.total === 1) {
        return c.json({ error: "Cannot downgrade the only member" }, 400)
      }

      await databases.updateDocument(DATABASE_ID, MEMBERS_ID, memberId, {
        role,
      })

      return c.json({
        data: { $id: memberToUpdate.$id },
        message: "Member updated succesfully!!s",
      })
    }
  )

export default app
