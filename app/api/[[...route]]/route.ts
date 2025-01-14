import { Hono } from "hono"
import { handle } from "hono/vercel"
import auth from "../../../components/auth/server/route"
import workspaces from "../../../components/workspaces/server/route"
import members from "../../../components/members/server/route"
import projects from "../../../components/workspaces/Projects/server/route"
import tasks from "../../../components/Task/server/route"
const app = new Hono().basePath("/api")

const route = app
  .route("/auth", auth)
  .route("/workspaces", workspaces)
  .route("/members", members)
  .route("/projects", projects)
  .route("/tasks", tasks)

export const GET = handle(app)
export const POST = handle(app)
export const PATCH = handle(app)
export const DELETE = handle(app)

export type AppType = typeof route
