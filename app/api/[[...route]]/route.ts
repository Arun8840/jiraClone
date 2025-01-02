import { Hono } from "hono"
import { handle } from "hono/vercel"
import auth from "../../../components/auth/server/route"
import workspaces from "../../../components/workspaces/server/route"
const app = new Hono().basePath("/api")

const route = app.route("/auth", auth).route("/workspaces", workspaces)

export const GET = handle(app)
export const POST = handle(app)

export type AppType = typeof route
