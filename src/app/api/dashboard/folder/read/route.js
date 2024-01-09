import Folder from "@/classes/folder"
import { NextResponse } from "next/server"

export async function POST(req) {
  const { userId, id } = await req.json()

  if (id) {
    const folder = await Folder.read("perId", id)

    if (folder) return NextResponse.json({ result: folder })
  }

  if (userId) {
    const folders = await Folder.read("perUser", userId)

    if (folders) return NextResponse.json({ result: folders })
  }
  return NextResponse.json({ result: null })
}
