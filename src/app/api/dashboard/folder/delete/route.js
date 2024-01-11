import Folder from "@/classes/folder"
import { NextResponse } from "next/server"

export async function POST(req) {
    const { folderId } = await req.json()

    if (!folderId) return NextResponse.json({result: null})

    return NextResponse.json({result: await Folder.delete(folderId)})
}