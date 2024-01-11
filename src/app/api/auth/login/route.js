import { NextResponse } from "next/server"
import User from "@/classes/user"
import Token from "@/classes/token"
import { cookies } from "next/headers"

export async function POST(req) {
  const { name = false, password = false } = await req.json()
  
  const auth =
    name && password && !!(await User.read({ name: name, password: password }))

  auth && (await Token.create(name, password))
  return NextResponse.json({ auth: auth })
}
