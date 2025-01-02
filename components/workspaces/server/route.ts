import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import { createWorkSchema } from "../schema/schemas"
import { sessionMiddleware } from "@/lib/session-middleware"
import { DATABASE_ID, WORKSPACE_ID } from "@/lib/config"
import { ID } from "node-appwrite"

const app = new Hono()
  .get("/workspaces", sessionMiddleware, async (c) => {
    const databases = c.get("databases")
    const workspaces = await databases.listDocuments(DATABASE_ID, WORKSPACE_ID)

    return c.json({
      success: true,
      data: workspaces,
      message: "Workspaces loadded successfully",
    })
  })
  .post(
    "/",
    zValidator("json", createWorkSchema),
    sessionMiddleware,
    async (c) => {
      const databases = c.get("databases")
      const user = c.get("user")

      const { name } = c.req.valid("json")

      const workspace = await databases.createDocument(
        DATABASE_ID,
        WORKSPACE_ID,
        ID.unique(),
        {
          name,
          userId: user.$id,
        }
      )

      return c.json({ data: workspace })
    }
  )

export default app
