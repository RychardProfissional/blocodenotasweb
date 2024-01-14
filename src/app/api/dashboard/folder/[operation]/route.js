import Folder from "@/classes/folder"
import { NextResponse } from "next/server"

export async function POST(req) {
  const data = await req.json()

  // Achar forma correta de pegar parametro de rota dinamica
  const operation = /\/([a-zA-Z]+)$/.exec(await req.url)[1].toLowerCase()

  try {
    return NextResponse.json({ result: await Folder[operation](data) })
  } catch (err) {
    console.log("[ERRO] O nome da operação esta incorreto")
    return NextResponse.json({ result: null })
  }
}
