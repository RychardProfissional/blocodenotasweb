import { NextResponse } from "next/server"
import User from "@/database/user"
import Token from "@/database/token"

export async function POST(req) {
  const { name = false, password = false } = await req.json()
  const auth =
    name && password && !!(await User.read({ name: name, password: password }))

  auth && Token.create(name, password)

  return NextResponse.json({ auth: auth })
}
