import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import { LoginSchema, RegisterSchema } from "../schema/AuthSchema"
import { createAdminClient } from "@/lib/appwrite"
import { ID } from "node-appwrite"
import { deleteCookie, setCookie } from "hono/cookie"
import { AUTH_COOKIE } from "../contants"
import { sessionMiddleware } from "@/lib/session-middleware"

const app = new Hono()
  // TODO GET LOGGED USER
  .get("/current", sessionMiddleware, (c) => {
    const user = c.get("user")
    return c.json({ data: user })
  })

  // TODO LOGIN
  .post("/login", zValidator("json", LoginSchema), async (c) => {
    const { email, password } = c.req.valid("json")

    const { account } = await createAdminClient()
    const session = await account.createEmailPasswordSession(email, password)

    setCookie(c, AUTH_COOKIE, session.secret, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 60 * 60 * 24 * 30,
    })
    return c.json({ success: "ok", message: "Login Successfully" })
  })

  // TODO REGISTER
  .post("/register", zValidator("json", RegisterSchema), async (c) => {
    const { email, password, name } = c.req.valid("json")

    const { account } = await createAdminClient()
    await account.create(ID.unique(), email, password, name)

    const session = await account.createEmailPasswordSession(email, password)

    setCookie(c, AUTH_COOKIE, session.secret, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 60 * 60 * 24 * 30,
    })
    return c.json({ success: true, message: "Register Successfully" })
  })

  // TODO LOGOUT
  .post("/logout", sessionMiddleware, async (c) => {
    const account = c.get("account")

    deleteCookie(c, AUTH_COOKIE)
    await account.deleteSession("current")
    return c.json({ success: true })
  })

export default app
