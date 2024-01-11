import Folder from "@/classes/folder";
import { NextResponse } from "next/server";

export async function POST(req) {
    const {folderId, userId, name} = await req.json()

    if(folderId) {
        return NextResponse.json({result: await Folder.read('perId', folderId)})
    }

    if(userId){
        return NextResponse.json({result: await Folder.read('perUser', userId)})
    }

    if(name){
        return NextResponse.json({result: await Folder.read('perName', name)})
    }

    return NextResponse.json({result: null})
}
