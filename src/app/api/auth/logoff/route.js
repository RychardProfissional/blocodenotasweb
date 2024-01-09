"use server"

import Token from "@/classes/token"
import { NextResponse } from "next/server"

export async function POST(req) {
  const { token } = await req.json()
  return NextResponse.json({ auth: await Token.revoke(token) })
}
