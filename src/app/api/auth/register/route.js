import { NextResponse } from "next/server"
import User from "@/classes/user"
import Token from "@/classes/token"

export async function POST(req) {
  const { name = false, password = false, email } = await req.json()
  const auth = name && password && !!(await User.create(name, password, email))

  auth && (await Token.create(name, password))

  return NextResponse.json({ auth: auth })
}
