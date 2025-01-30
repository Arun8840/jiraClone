import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import { createWorkSchema, updateWorkSchema } from "../schema/schemas"
import { sessionMiddleware } from "@/lib/session-middleware"
import {
  DATABASE_ID,
  IMAGES_BUCKET_ID,
  MEMBERS_ID,
  TASKS_ID,
  WORKSPACE_ID,
} from "@/lib/config"
import { ID, Query } from "node-appwrite"
import { MemberRole } from "@/models/RoleTypes"
import { generateInviteCode } from "@/Utility/get-inviteCode"
import { getMembers } from "../members/util-get-members"
import { z } from "zod"
import { Workspace } from "../types"
import { startOfMonth, endOfMonth, subMonths } from "date-fns"
import { TaskStatus } from "@/components/Task/types"

const app = new Hono()
  // * LOAD ALL WORKSPACES
  .get("/workspaces", sessionMiddleware, async (c) => {
    const databases = c.get("databases")
    const user = c.get("user")
    const members = await databases.listDocuments(DATABASE_ID, MEMBERS_ID, [
      Query.equal("userId", user?.$id),
    ])
    if (members?.total === 0) {
      return c.json({ data: { documents: null, total: 0 } })
    }

    const workspaceIds = members?.documents?.map((member) => member.workspaceId)
    const workspaces = await databases.listDocuments(
      DATABASE_ID,
      WORKSPACE_ID,
      [Query.orderDesc("$createdAt"), Query.contains("$id", workspaceIds)]
    )

    return c.json({
      success: true,
      data: workspaces,
      message: "Workspaces loadded successfully",
    })
  })

  // * GET WORKSPACE
  .get("/:workspaceId", sessionMiddleware, async (c) => {
    const databases = c.get("databases")
    const user = c.get("user")
    const { workspaceId } = c.req.param()

    const memeber = await getMembers({
      databases,
      userId: user.$id,
      workspaceId,
    })

    if (!memeber) {
      return c.json({ error: "Unauthorized" }, 401)
    }

    const workspace = await databases.getDocument(
      DATABASE_ID,
      WORKSPACE_ID,
      workspaceId
    )

    return c.json({
      data: workspace,
      message: "Workspace loadded successfully",
    })
  })
  // * CREATE NEW WORKSPACE
  .post(
    "/",
    zValidator("form", createWorkSchema),
    sessionMiddleware,
    async (c) => {
      const databases = c.get("databases")
      const storage = c.get("storage")
      const user = c.get("user")

      let uploadedImageUrl: string | undefined
      const { name, image, description } = c.req.valid("form")
      if (image instanceof File) {
        const file = await storage.createFile(
          IMAGES_BUCKET_ID,
          ID.unique(),
          image
        )

        const arrayBuffer = await storage.getFilePreview(
          IMAGES_BUCKET_ID,
          file.$id
        )

        uploadedImageUrl = `data:image/png;base64,${Buffer.from(
          arrayBuffer
        ).toString("base64")}`
      }

      const workspace = await databases.createDocument(
        DATABASE_ID,
        WORKSPACE_ID,
        ID.unique(),
        {
          name,
          userId: user.$id,
          imageUrl: uploadedImageUrl,
          inviteCode: generateInviteCode({ length: 6 }),
          description: description,
        }
      )
      await databases.createDocument(DATABASE_ID, MEMBERS_ID, ID.unique(), {
        userId: user.$id,
        workspaceId: workspace.$id,
        role: MemberRole.ADMIN,
      })

      return c.json({
        data: workspace,
        message: "Workspace created successfully!",
      })
    }
  )

  // *UPDATE WORKSPACE
  .patch(
    "/:workspaceId",
    zValidator("form", updateWorkSchema),
    sessionMiddleware,
    async (c) => {
      const databases = c.get("databases")
      const storage = c.get("storage")
      const user = c.get("user")

      let uploadedImageUrl: string | undefined
      const { workspaceId } = c.req.param()
      const { name, image } = c.req.valid("form")

      const member = await getMembers({
        databases,
        userId: user.$id,
        workspaceId,
      })

      if (!member || member.role !== MemberRole.ADMIN) {
        return c.json({ error: "Unauthorized" }, 401)
      }
      if (image instanceof File) {
        const file = await storage.createFile(
          IMAGES_BUCKET_ID,
          ID.unique(),
          image
        )

        const arrayBuffer = await storage.getFilePreview(
          IMAGES_BUCKET_ID,
          file.$id
        )

        uploadedImageUrl = `data:image/png;base64,${Buffer.from(
          arrayBuffer
        ).toString("base64")}`
      } else {
        uploadedImageUrl = image
      }

      const workspace = await databases.updateDocument(
        DATABASE_ID,
        WORKSPACE_ID,
        workspaceId,
        {
          name,
          imageUrl: uploadedImageUrl,
        }
      )

      return c.json({
        data: workspace,
        message: "Workspace updated succesfully!!",
      })
    }
  )

  // !DELETE WORKSPACE
  .delete("/:workspaceId", sessionMiddleware, async (c) => {
    const databases = c.get("databases")
    const user = c.get("user")

    const { workspaceId } = c.req.param()

    const member = await getMembers({
      databases,
      userId: user.$id,
      workspaceId,
    })

    if (!member || member.role !== MemberRole.ADMIN) {
      return c.json({ error: "Unauthorized" }, 401)
    }

    await databases.deleteDocument(DATABASE_ID, WORKSPACE_ID, workspaceId)

    return c.json({
      data: { $id: workspaceId },
      message: "Workspace deleted succesfully!!",
    })
  })

  // * RESET INVITE LINK
  .post("/:workspaceId/reset-invite-link", sessionMiddleware, async (c) => {
    const databases = c.get("databases")
    const user = c.get("user")

    const { workspaceId } = c.req.param()

    const member = await getMembers({
      databases,
      userId: user.$id,
      workspaceId,
    })

    if (!member || member.role !== MemberRole.ADMIN) {
      return c.json({ error: "Unauthorized" }, 401)
    }

    const workspace = await databases.updateDocument(
      DATABASE_ID,
      WORKSPACE_ID,
      workspaceId,
      {
        inviteCode: generateInviteCode({ length: 6 }),
      }
    )

    return c.json({
      data: { $id: workspace },
      message: "Workspace Invite link reset succesfully!!",
    })
  })

  // * JOIN THE WORKSPACE WITH INVITE LINK
  .post(
    "/:workspaceId/join",
    sessionMiddleware,
    zValidator("json", z.object({ code: z.string() })),
    async (c) => {
      const { workspaceId } = c.req.param()
      const { code } = c.req.valid("json")
      const user = c.get("user")
      const databases = c.get("databases")

      const workspace = await databases.getDocument<Workspace>(
        DATABASE_ID,
        WORKSPACE_ID,
        workspaceId
      )
      const member = await getMembers({
        databases,
        userId: user.$id,
        workspaceId,
      })
      if (member) {
        return c.json({ data: workspace, message: "Already a member!" })
      }

      if (workspace.inviteCode !== code) {
        return c.json({ data: null, message: "Invalid invite code !!" }, 400)
      }

      await databases.createDocument(DATABASE_ID, MEMBERS_ID, ID.unique(), {
        workspaceId,
        userId: user.$id,
        role: MemberRole.MEMBER,
      })

      return c.json({
        data: workspace,
        message: `${user.name} is linked successfully!!`,
      })
    }
  )

  .get("/:workspaceId/analytics", sessionMiddleware, async (c) => {
    const databases = c.get("databases")
    const user = c.get("user")
    const { workspaceId } = c.req.param()

    const memeber = await getMembers({
      databases,
      userId: user.$id,
      workspaceId: workspaceId,
    })

    if (!memeber) {
      return c.json({ error: "Unauthorized" }, 401)
    }

    // * date and monts
    const now = new Date()
    const thisMonthStart = startOfMonth(now)
    const thisMonthEnd = endOfMonth(now)
    const lastMonthStart = startOfMonth(subMonths(now, 1))
    const lastMonthEnd = endOfMonth(subMonths(now, 1))

    const thisMonthTasks = await databases.listDocuments(
      DATABASE_ID,
      TASKS_ID,
      [
        Query.equal("workspaceId", workspaceId),
        Query.greaterThanEqual("$createdAt", thisMonthStart.toISOString()),
        Query.lessThanEqual("$createdAt", thisMonthEnd.toISOString()),
      ]
    )

    const lastMonthTasks = await databases.listDocuments(
      DATABASE_ID,
      TASKS_ID,
      [
        Query.equal("workspaceId", workspaceId),
        Query.greaterThanEqual("$createdAt", lastMonthStart.toISOString()),
        Query.lessThanEqual("$createdAt", lastMonthEnd.toISOString()),
      ]
    )

    const taskCount = thisMonthTasks.total
    const taskDifference = taskCount - lastMonthTasks.total

    // assigned base count
    const thisMonthAssignedTasks = await databases.listDocuments(
      DATABASE_ID,
      TASKS_ID,
      [
        Query.equal("workspaceId", workspaceId),
        Query.equal("assigneeId", memeber.$id),
        Query.greaterThanEqual("$createdAt", thisMonthStart.toISOString()),
        Query.lessThanEqual("$createdAt", thisMonthEnd.toISOString()),
      ]
    )

    const lastMonthAssignedTasks = await databases.listDocuments(
      DATABASE_ID,
      TASKS_ID,
      [
        Query.equal("workspaceId", workspaceId),
        Query.equal("assigneeId", memeber.$id),
        Query.greaterThanEqual("$createdAt", lastMonthStart.toISOString()),
        Query.lessThanEqual("$createdAt", lastMonthEnd.toISOString()),
      ]
    )

    const assignedTaskCount = thisMonthAssignedTasks.total
    const assignedTaskDifference =
      assignedTaskCount - lastMonthAssignedTasks.total

    // status incomplete
    const thisMonthIncompleteTasks = await databases.listDocuments(
      DATABASE_ID,
      TASKS_ID,
      [
        Query.equal("workspaceId", workspaceId),
        Query.notEqual("status", TaskStatus.DONE),
        Query.greaterThanEqual("$createdAt", thisMonthStart.toISOString()),
        Query.lessThanEqual("$createdAt", thisMonthEnd.toISOString()),
      ]
    )

    const lastMonthIncompleteTasks = await databases.listDocuments(
      DATABASE_ID,
      TASKS_ID,
      [
        Query.equal("workspaceId", workspaceId),
        Query.notEqual("status", TaskStatus.DONE),
        Query.greaterThanEqual("$createdAt", lastMonthStart.toISOString()),
        Query.lessThanEqual("$createdAt", lastMonthEnd.toISOString()),
      ]
    )

    const incompleteTaskCount = thisMonthIncompleteTasks.total
    const incompleteTaskDifference =
      incompleteTaskCount - lastMonthIncompleteTasks.total

    // status complete
    const thisMonthCompleteTasks = await databases.listDocuments(
      DATABASE_ID,
      TASKS_ID,
      [
        Query.equal("workspaceId", workspaceId),
        Query.equal("status", TaskStatus.DONE),
        Query.greaterThanEqual("$createdAt", thisMonthStart.toISOString()),
        Query.lessThanEqual("$createdAt", thisMonthEnd.toISOString()),
      ]
    )

    const lastMonthCompleteTasks = await databases.listDocuments(
      DATABASE_ID,
      TASKS_ID,
      [
        Query.equal("workspaceId", workspaceId),
        Query.equal("status", TaskStatus.DONE),
        Query.greaterThanEqual("$createdAt", lastMonthStart.toISOString()),
        Query.lessThanEqual("$createdAt", lastMonthEnd.toISOString()),
      ]
    )

    const completeTaskCount = thisMonthCompleteTasks.total
    const completeTaskDifference =
      completeTaskCount - lastMonthCompleteTasks.total

    // status over due
    const thisMonthOverdueTasks = await databases.listDocuments(
      DATABASE_ID,
      TASKS_ID,
      [
        Query.equal("workspaceId", workspaceId),
        Query.notEqual("status", TaskStatus.DONE),
        Query.lessThan("dueDate", now.toISOString()),
        Query.greaterThanEqual("$createdAt", thisMonthStart.toISOString()),
        Query.lessThanEqual("$createdAt", thisMonthEnd.toISOString()),
      ]
    )

    const lastMonthOverdueTasks = await databases.listDocuments(
      DATABASE_ID,
      TASKS_ID,
      [
        Query.equal("workspaceId", workspaceId),
        Query.notEqual("status", TaskStatus.DONE),
        Query.lessThan("dueDate", now.toISOString()),
        Query.greaterThanEqual("$createdAt", lastMonthStart.toISOString()),
        Query.lessThanEqual("$createdAt", lastMonthEnd.toISOString()),
      ]
    )

    const overdueTaskCount = thisMonthOverdueTasks.total
    const overdueTaskDifference = overdueTaskCount - lastMonthOverdueTasks.total

    return c.json({
      data: {
        taskCount,
        taskDifference,
        assignedTaskCount,
        assignedTaskDifference,
        incompleteTaskCount,
        incompleteTaskDifference,
        completeTaskCount,
        completeTaskDifference,
        overdueTaskCount,
        overdueTaskDifference,
      },
    })
  })

export default app
