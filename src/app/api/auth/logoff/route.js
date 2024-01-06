"use server"

import { NextResponse } from "next/server"

export async function POST(req) {
  const params = await req.json()

  return NextResponse.json({ ok: false })
}
