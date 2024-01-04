import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { sign } from "jsonwebtoken"
import { createUser } from "@/database/user"

export async function POST(req) {
  const params = await req.json()
  const data = {
    name: params.name,
    password: params.password,
    email: params.email,
  }

  const auth =
    !Object.values(data).some((x) => !x) && !!(await createUser(data))

  auth &&
    cookies().set(
      "TOKEN",
      sign(data, process.env.KEY_TOKEN, { expiresIn: 3 * 60 * 60 }),
      { path: "/" }
    )

  return NextResponse.json({ auth: auth })
}
