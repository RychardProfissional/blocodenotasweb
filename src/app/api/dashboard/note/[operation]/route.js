import Note from "@/classes/note"
import { NextResponse } from "next/server"

export async function POST(req) {
  const data = await req.json()
  const operation = /\/([a-zA-Z]+)$/.exec(await req.url)[1].toLowerCase()

  try {
    return NextResponse.json({ result: await Note[operation](data) })
  } catch (err) {
    console.log("[ERRO] O nome da operação esta incorreto")
    return NextResponse.json({ result: null })
  }
}
