import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import prisma from "@/classes/prisma"

export async function PATCH(req, { params }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = params
  const { name } = await req.json()
  const userId = parseInt(session.user.id)

  try {
    // Check ownership
    const userFolder = await prisma.userToFolder.findUnique({
      where: {
        userid_folderid: {
          userid: userId,
          folderid: parseInt(id),
        },
      },
    })

    if (!userFolder) {
      return NextResponse.json(
        { error: "Not found or unauthorized" },
        { status: 404 }
      )
    }

    const folder = await prisma.folder.update({
      where: { id: parseInt(id) },
      data: { name },
    })

    return NextResponse.json(folder)
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

  const { id } = params
  const userId = parseInt(session.user.id)

  try {
    // Check ownership
    const userFolder = await prisma.userToFolder.findUnique({
      where: {
        userid_folderid: {
          userid: userId,
          folderid: parseInt(id),
        },
      },
    })

    if (!userFolder) {
      return NextResponse.json(
        { error: "Not found or unauthorized" },
        { status: 404 }
      )
    }

    await prisma.folder.delete({
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
