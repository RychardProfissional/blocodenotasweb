import Folder from "@/classes/folder"
import { NextResponse } from "next/server"

export async function POST(req) {
    const {name, userId} = await req.json()
    
    if (!name || !userId) return NextResponse.json({result: null})

    return NextResponse.json({result: await Folder.create(name, userId)})
}