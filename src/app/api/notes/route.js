import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import prisma from "@/classes/prisma"

export async function POST(req) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { title, text, folderid } = await req.json()
  const userId = parseInt(session.user.id)

  if (!folderid) {
    return NextResponse.json(
      { error: "Folder ID is required" },
      { status: 400 }
    )
  }

  try {
    // Check if user has access to the folder
    const userFolder = await prisma.userToFolder.findUnique({
      where: {
        userid_folderid: {
          userid: userId,
          folderid: parseInt(folderid),
        },
      },
    })

    if (!userFolder) {
      return NextResponse.json(
        { error: "Folder not found or unauthorized" },
        { status: 404 }
      )
    }

    const note = await prisma.note.create({
      data: {
        title: title || "New Note",
        text: text || "",
        folderid: parseInt(folderid),
      },
    })

    return NextResponse.json(note)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
