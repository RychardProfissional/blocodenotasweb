import { readUser } from "@/database/user"
import { NextResponse } from "next/server"
import { verify } from "jsonwebtoken"

export async function POST(req) {
  const token = (await req.json()).token
  let auth = false
  if (token) {
    verify(
      token,
      process.env.KEY_TOKEN,
      (err, decoded) =>
        (auth = err && !!readUser({ name: decoded.name, password: decoded.password }))
    )
  }

  return NextResponse.json({ auth: auth })
}
