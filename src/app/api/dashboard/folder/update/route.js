import Folder from "@/classes/folder"
import { NextResponse } from "next/server"

export async function POST(req) {
    const {folderId, newName} = await req.json()
    
    if (!folderId || !newName) return NextResponse.json({result: null})
    
    return NextResponse.json({result: await Folder.update(folderId, newName)})
}