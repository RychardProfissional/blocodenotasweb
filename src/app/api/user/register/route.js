import { createUser } from "@/database/user";
import { NextResponse } from "next/server";

export async function POST(request){
    console.log('api register acessada')
    const {name, password, email} = await request.json()
    
    if (!name) return NextResponse.json({ok: false})
    
    const user = await createUser({
        name: name,
        password: password,
        email: email
    })
    console.log(user)
    console.log(!!user)
    return NextResponse.json({ok: !!user});
}

export async function GET(request){return new Response('', {status: 404})}
