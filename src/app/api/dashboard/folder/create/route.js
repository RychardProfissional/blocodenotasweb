import Folder from "@/classes/folder"
import { NextResponse } from "next/server"

export async function POST(req) {
  const { userId, name } = await req.json()

  if (userId && name) {
    const folder = await Folder.create(userId, name)
    console.log(folder)
    return NextResponse.json({
      folder: folder,
    })
  }

  return NextResponse.json({ folder: null })
}
