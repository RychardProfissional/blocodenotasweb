import User from "@/classes/user"
import { NextResponse } from "next/server"
import Token from "@/classes/token"

export async function POST(req) {
  const { token } = await req.json()
  const { name, password }  = await Token.verify(token)

  return NextResponse.json({
    auth:
      !!name && !!password &&
      !!(await User.read({
        name: name,
        password: password,
      })),
  })
}
