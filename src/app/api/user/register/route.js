import { createUser } from "@/database/user";
import { NextResponse } from "next/server";

export async function POST(request){
    const {name, password, email} = await request.json()

    if (name) return NextResponse.json({ok: false})

    const user = await createUser({
        name: name,
        password: password,
        email: email
    })
    
    console.log(user);

    return NextResponse.json({ok: !!user || false});
}

export async function GET(request){return new Response('', {status: 404})}
