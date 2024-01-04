import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { sign } from "jsonwebtoken"
import { readUser } from "@/database/user"

export async function POST(req) {
  const params = await req.json()
  const where = { name: params.name, password: params.password }

  const auth = !Object.values(where).some((x) => !x) && !!(await readUser(where))

  auth &&
    cookies().set("TOKEN", sign(where, process.env.KEY_TOKEN, { expiresIn: 3 * 60 * 60 }), {
      path: "/",
    })

  return NextResponse.json({ auth: auth })
}
