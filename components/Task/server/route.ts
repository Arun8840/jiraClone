import { sessionMiddleware } from "@/lib/session-middleware"
import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import { CreateTaskSchema } from "../Schemas"
import { getMembers } from "@/components/workspaces/members/util-get-members"
import { DATABASE_ID, MEMBERS_ID, PROJECTS_ID, TASKS_ID } from "@/lib/config"
import { ID, Query } from "node-appwrite"
import { z } from "zod"
import { Task, TaskStatus } from "../types"
import { createAdminClient } from "@/lib/appwrite"
import { Projects } from "@/components/workspaces/Projects/type"

const app = new Hono()

  // * GET ALL TASKS
  .get(
    "/",
    sessionMiddleware,
    zValidator(
      "query",
      z.object({
        workspaceId: z.string(),
        projectId: z.string().nullish(),
        assigneeId: z.string().nullish(),
        status: z.nativeEnum(TaskStatus).nullish(),
        search: z.string().nullish(),
        dueDate: z.string().nullish(),
      })
    ),
    async (c) => {
      const { users } = await createAdminClient()
      const databases = c.get("databases")
      const user = c.get("user")

      const { workspaceId, assigneeId, projectId, search, status } =
        c.req.valid("query")

      const member = await getMembers({
        databases,
        userId: user.$id,
        workspaceId,
      })

      if (!member) {
        return c.json({ error: "Unauthorized" }, 401)
      }

      const query = [
        Query.equal("workspaceId", workspaceId),
        Query.orderDesc("$createdAt"),
      ]

      if (projectId) {
        query.push(Query.equal("projectId", projectId))
      }
      if (status) {
        query.push(Query.equal("status", status))
      }
      if (assigneeId) {
        query.push(Query.equal("assigneeId", assigneeId))
      }

      if (search) {
        query.push(Query.search("name", search))
      }

      const tasks = await databases.listDocuments<Task>(
        DATABASE_ID,
        TASKS_ID,
        query
      )

      const projectIds = tasks.documents.map((task) => task.projectId)
      const assigneeIds = tasks.documents.map((task) => task.assigneeId)

      const projects = await databases.listDocuments<Projects>(
        DATABASE_ID,
        PROJECTS_ID,
        projectIds.length > 0 ? [Query.contains("$id", projectIds)] : []
      )

      const members = await databases.listDocuments(
        DATABASE_ID,
        MEMBERS_ID,
        assigneeIds.length > 0 ? [Query.contains("$id", assigneeIds)] : []
      )

      const assignees = await Promise.all(
        members.documents?.map(async (member) => {
          const user = await users.get(member.userId)

          return {
            ...member,
            name: user.name,
            email: user.email,
          }
        })
      )

      const populatedTasks = tasks.documents.map((task) => {
        const project = projects.documents?.find(
          (project) => project.$id === task.projectId
        )
        const assignee = assignees.find(
          (assignee) => assignee.$id === task.assigneeId
        )
        return {
          ...task,
          project,
          assignee,
        }
      })

      return c.json({
        data: {
          ...tasks,
          documents: populatedTasks,
        },
      })
    }
  )

  // * GET TASK
  .get("/:taskId", sessionMiddleware, async (c) => {
    const { users } = await createAdminClient()
    const databases = c.get("databases")
    const currentUser = c.get("user")

    const { taskId } = c.req.param()

    const task = await databases.getDocument<Task>(
      DATABASE_ID,
      TASKS_ID,
      taskId
    )

    const currentMember = await getMembers({
      databases,
      userId: currentUser.$id,
      workspaceId: task.workspaceId,
    })

    if (!currentMember) {
      return c.json({ error: "Unauthorized" }, 401)
    }

    const project = await databases.getDocument<Projects>(
      DATABASE_ID,
      PROJECTS_ID,
      task.projectId
    )

    const memeber = await databases.getDocument(
      DATABASE_ID,
      MEMBERS_ID,
      task.assigneeId
    )

    const user = await users.get(memeber.userId)
    const assignee = {
      ...memeber,
      name: user.name,
      email: user.email,
    }

    return c.json({
      data: {
        ...task,
        project,
        assignee,
      },
    })
  })
  // * CREATE TASK
  .post(
    "/",
    sessionMiddleware,
    zValidator("json", CreateTaskSchema),
    async (c) => {
      const user = c.get("user")
      const databases = c.get("databases")
      //   request data
      const {
        assigneeId,
        dueDate,
        name,
        projectId,
        status,
        workspaceId,
        description,
      } = c.req.valid("json")

      const member = await getMembers({
        databases,
        userId: user.$id,
        workspaceId,
      })

      if (!member) {
        return c.json({ message: "Unauthorized" }, 401)
      }

      //   highest position of task
      const highestPositionTask = await databases.listDocuments(
        DATABASE_ID,
        TASKS_ID,
        [
          Query.equal("status", status),
          Query.equal("workspaceId", workspaceId),
          Query.orderAsc("position"),
          Query.limit(1),
        ]
      )

      //   new position generation of the tasks
      const newPosition =
        highestPositionTask.documents.length > 0
          ? highestPositionTask.documents[0].position + 1000
          : 1000

      const task = await databases.createDocument(
        DATABASE_ID,
        TASKS_ID,
        ID.unique(),
        {
          name,
          description,
          workspaceId,
          projectId,
          assigneeId,
          status,
          dueDate,
          position: newPosition,
        }
      )

      return c.json({ data: task, message: "Task created!!" })
    }
  )

  // ! DELETE TASK
  .delete("/:taskId", sessionMiddleware, async (c) => {
    const user = c.get("user")
    const databases = c.get("databases")
    const { taskId } = c.req.param()

    const task = await databases.getDocument<Task>(
      DATABASE_ID,
      TASKS_ID,
      taskId
    )

    const member = await getMembers({
      databases,
      userId: user?.$id,
      workspaceId: task?.workspaceId,
    })

    if (!member) {
      return c.json({ error: "Unauthorized" }, 401)
    }

    await databases.deleteDocument(DATABASE_ID, TASKS_ID, taskId)

    return c.json({
      $id: task?.$id,
    })
  })
  .post(
    "/bulk-update",
    sessionMiddleware,
    zValidator(
      "json",
      z.object({
        tasks: z.array(
          z.object({
            $id: z.string(),
            status: z.nativeEnum(TaskStatus),
            position: z.number().int().positive().min(1000).max(1_000_000),
          })
        ),
      })
    ),
    async (c) => {
      const databases = c.get("databases")
      const user = c.get("user")
      const { tasks } = await c.req.valid("json")

      const tasksToUpdate = await databases.listDocuments(
        DATABASE_ID,
        TASKS_ID,
        [
          Query.contains(
            "$id",
            tasks?.map((task) => task?.$id)
          ),
        ]
      )

      const workspaceIds = new Set(
        tasksToUpdate.documents.map((task) => task.workspaceId)
      )

      if (workspaceIds.size !== 1) {
        return c.json({ error: "All task must belong to the same workspace " })
      }

      const workspaceId = workspaceIds.values().next().value
      const member = await getMembers({
        databases,
        userId: user?.$id,
        workspaceId,
      })

      if (!member) {
        return c.json({ error: "Unauthorized" }, 401)
      }

      const updatedTasks = await Promise.all(
        tasks.map(async (task) => {
          const { $id, position, status } = task
          return databases.updateDocument<Task>(DATABASE_ID, TASKS_ID, $id, {
            status,
            position,
          })
        })
      )

      return c.json({ data: updatedTasks })
    }
  )
export default app
