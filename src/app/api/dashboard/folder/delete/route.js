import Folder from "@/classes/folder"
import { NextResponse } from "next/server"

export async function POST(req) {
    const { id } = await req.json()

    return NextResponse.json({result: await Folder.delete(id)})
}