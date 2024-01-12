import Note from "@/classes/note"
import { NextResponse } from "next/server"

export async function POST(req) {
    const {folderid, title, text} = await req.json()

    return NextResponse.json({
        result: await Note.create(folderid, title, text)
    })
}