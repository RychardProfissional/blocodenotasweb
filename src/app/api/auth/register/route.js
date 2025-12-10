import { NextResponse } from "next/server"
import User from "@/classes/user"

export async function POST(req) {
  const { name = false, password = false, email } = await req.json()
  const user = name && password && (await User.create(name, password, email))

  return NextResponse.json({ success: !!user })
}
