import { NextResponse } from "next/server"
import User from "@/database/user"
import Token from "@/database/token"

export async function POST(req) {
  const { name, password, email } = await req.json()
  const auth = name && password && !!(await User.create(name, password, email))

  auth && Token.create(name, password)

  return NextResponse.json({ auth: auth })
}
