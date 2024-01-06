import User from "@/database/user"
import { NextResponse } from "next/server"
import Token from "@/database/token"

export async function POST(req) {
  const { token } = await req.json()
  const decodedToken = !!token && Token.verify(token)

  return NextResponse.json({
    auth:
      !!decodedToken && !!User.read(decodedToken.name, decodedToken.password),
  })
}
