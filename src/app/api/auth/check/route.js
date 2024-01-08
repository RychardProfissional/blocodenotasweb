import User from "@/classes/user"
import { NextResponse } from "next/server"
import Token from "@/classes/token"

export async function POST(req) {
  const res = await req.json()
  const decodedToken = await Token.verify(res.token)

  return NextResponse.json({
    auth:
      !!decodedToken &&
      !!(await User.read({
        name: decodedToken.name,
        password: decodedToken.password,
      })),
  })
}
