import Note from "@/classes/note"
import { NextResponse } from "next/server"

export async function POST(req) {
  const { operation, data } = await req.json()

  try {
    return NextResponse.json({ result: await Note[operation](data) })
  } catch (err) {
    console.log("[ERRO] O nome da operação esta incorreto")
    return NextResponse.json({ result: null })
  }
}
