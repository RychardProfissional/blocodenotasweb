"use server"

import Token from "@/classes/token"
import { NextResponse } from "next/server"

export async function POST(req) {
  console.log("acessando logoff")

  const res = await req.json()
  return NextResponse.json({ auth: await Token.revoke(res.token) })
}
