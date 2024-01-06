"use server"

import Token from "@/database/token"
import { NextResponse } from "next/server"

export async function POST(req) {
  const { token } = await req.json()
  return NextResponse.json({ auth: Token.revoke(token) })
}
