import Note from "@/classes/note"
import { NextResponse } from "next/server"

export async function POST(req) {
    const { id } = await req.json()

    return NextResponse.json({result: await Note.delete(id)})
}