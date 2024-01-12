import Note from "@/classes/note"
import { NextResponse } from "next/server"

export async function POST(req) {
    const { id, folderid } = await req.json()

    return NextResponse.json({
        result: await Note.read({id, folderid})
    })
}