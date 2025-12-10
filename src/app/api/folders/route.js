import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import prisma from "@/classes/prisma"

export async function GET(req) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const userId = parseInt(session.user.id)

  try {
    const userFolders = await prisma.userToFolder.findMany({
      where: { userid: userId },
      include: {
        folder: {
          include: {
            notes: true,
          },
        },
      },
    })

    const folders = userFolders.map((uf) => uf.folder)

    return NextResponse.json(folders)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}

export async function POST(req) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { name } = await req.json()
  const userId = parseInt(session.user.id)

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 })
  }

  try {
    const folder = await prisma.folder.create({
      data: {
        name,
        users: {
          create: {
            userid: userId,
          },
        },
      },
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
