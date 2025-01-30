import { sessionMiddleware } from "@/lib/session-middleware"
import { ID, Query } from "node-appwrite"
import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import { z } from "zod"
import { getMembers } from "../../members/util-get-members"
import { DATABASE_ID, IMAGES_BUCKET_ID, PROJECTS_ID } from "@/lib/config"
import { createProjectSchema, updateProjectSchema } from "../Schema/schemas"
import { MemberRole } from "@/models/RoleTypes"
import { Projects } from "../type"

const app = new Hono()

  // *LOAD LINKED WORKSPACE PROJECTS
  .get(
    "/",
    sessionMiddleware,
    zValidator(
      "query",
      z.object({
        workspaceId: z.string(),
      })
    ),
    async (c) => {
      const databases = c.get("databases")
      const user = c.get("user")
      const { workspaceId } = c.req.valid("query")

      //   check if the current user is memeber
      const member = await getMembers({
        databases,
        userId: user.$id,
        workspaceId,
      })

      if (!member) {
        return c.json({ error: "Unauthorized" }, 401)
      }

      if (!workspaceId) {
        return c.json({ error: "workspaceId not found and missing" }, 400)
      }

      const projects = await databases.listDocuments(DATABASE_ID, PROJECTS_ID, [
        Query.equal("workspaceId", workspaceId),
        Query.orderDesc("$createdAt"),
      ])
      return c.json({
        data: projects,
      })
    }
  )

  // * GET PROJECT
  .get("/:projectId", sessionMiddleware, async (c) => {
    const { projectId } = c.req.param()
    const databases = c.get("databases")
    const user = c.get("user")
    const project = await databases.getDocument<Projects>(
      DATABASE_ID,
      PROJECTS_ID,
      projectId
    )
    const memeber = await getMembers({
      databases,
      userId: user.$id,
      workspaceId: project.workspaceId,
    })
    if (!memeber) {
      return c.json({ error: "Unauthorized" }, 401)
    }

    return c.json({ data: project, message: "Project loadded successfully" })
  })

  // * CREATE NEW PROJECT
  .post(
    "/",
    sessionMiddleware,
    zValidator("form", createProjectSchema),

    async (c) => {
      const databases = c.get("databases")
      const storage = c.get("storage")
      const user = c.get("user")

      let uploadedImageUrl: string | undefined
      const { name, image, workspaceId } = c.req.valid("form")

      const memeber = await getMembers({
        databases,
        userId: user.$id,
        workspaceId,
      })

      if (!memeber) {
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
      }

      const project = await databases.createDocument(
        DATABASE_ID,
        PROJECTS_ID,
        ID.unique(),
        {
          name,
          imageUrl: uploadedImageUrl,
          workspaceId: workspaceId,
        }
      )

      return c.json({
        data: project,
        message: "Project created successfully!",
      })
    }
  )

  // *UPDATE PROJECT
  .patch(
    "/:projectId",
    zValidator("form", updateProjectSchema),
    sessionMiddleware,
    async (c) => {
      const databases = c.get("databases")
      const storage = c.get("storage")
      const user = c.get("user")

      let uploadedImageUrl: string | undefined
      const { projectId } = c.req.param()
      const { name, image } = c.req.valid("form")

      const existProjects = await databases.getDocument(
        DATABASE_ID,
        PROJECTS_ID,
        projectId
      )
      const member = await getMembers({
        databases,
        userId: user.$id,
        workspaceId: existProjects?.workspaceId,
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

      const project = await databases.updateDocument(
        DATABASE_ID,
        PROJECTS_ID,
        projectId,
        {
          name,
          imageUrl: uploadedImageUrl,
        }
      )

      return c.json({
        data: project,
        message: "Project updated succesfully!!",
      })
    }
  )

  // ! DELETE THE PROJECT
  .delete("/:projectId", sessionMiddleware, async (c) => {
    const databases = c.get("databases")
    const user = c.get("user")

    const { projectId } = c.req.param()
    const existProjects = await databases.getDocument(
      DATABASE_ID,
      PROJECTS_ID,
      projectId
    )
    const member = await getMembers({
      databases,
      userId: user.$id,
      workspaceId: existProjects?.workspaceId,
    })

    if (!member || member.role !== MemberRole.ADMIN) {
      return c.json({ error: "Unauthorized" }, 401)
    }

    await databases.deleteDocument(DATABASE_ID, PROJECTS_ID, projectId)

    return c.json({
      data: { $id: projectId },
      message: "Project deleted succesfully!!",
    })
  })

export default app
