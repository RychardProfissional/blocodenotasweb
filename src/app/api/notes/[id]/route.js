import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import prisma from "@/classes/prisma"

export async function PATCH(req, { params }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  const { title, text, folderid } = await req.json()
  const userId = parseInt(session.user.id)

  try {
    // Verify note ownership via folder
    const note = await prisma.note.findUnique({
      where: { id: parseInt(id) },
      include: { folder: true },
    })

    if (!note) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 })
    }

    // Check if user has access to the folder of the note
    const userFolder = await prisma.userToFolder.findUnique({
      where: {
        userid_folderid: {
          userid: userId,
          folderid: note.folderid,
        },
      },
    })

    if (!userFolder) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    // If moving to another folder, check access to that folder too
    if (folderid && folderid !== note.folderid) {
      const targetFolder = await prisma.userToFolder.findUnique({
        where: {
          userid_folderid: {
            userid: userId,
            folderid: parseInt(folderid),
          },
        },
      })
      if (!targetFolder) {
        return NextResponse.json(
          { error: "Target folder unauthorized" },
          { status: 403 }
        )
      }
    }

    const updatedNote = await prisma.note.update({
      where: { id: parseInt(id) },
      data: {
        title,
        text,
        folderid: folderid ? parseInt(folderid) : undefined,
      },
    })

    return NextResponse.json(updatedNote)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}

export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  const userId = parseInt(session.user.id)

  try {
    const note = await prisma.note.findUnique({
      where: { id: parseInt(id) },
    })

    if (!note) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 })
    }

    const userFolder = await prisma.userToFolder.findUnique({
      where: {
        userid_folderid: {
          userid: userId,
          folderid: note.folderid,
        },
      },
    })

    if (!userFolder) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    await prisma.note.delete({
      where: { id: parseInt(id) },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
