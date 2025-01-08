import { sessionMiddleware } from "@/lib/session-middleware"
import { ID, Query } from "node-appwrite"
import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import { z } from "zod"
import { getMembers } from "../../members/util-get-members"
import { DATABASE_ID, IMAGES_BUCKET_ID, PROJECTS_ID } from "@/lib/config"
import { createProjectSchema } from "../Schema/schemas"

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

export default app
