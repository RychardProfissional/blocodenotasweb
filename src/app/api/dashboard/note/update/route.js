import Note from "@/classes/note"
import { NextResponse } from "next/server"

export async function POST(req) {
    const {id, folderid, title, text} = await req.json()
    return NextResponse.json({
        result : await Note.update(
            id, 
            {folderid, title, text},
        )
    })
}