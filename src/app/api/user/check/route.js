import { readUser } from "@/database/user"
import { NextResponse } from "next/server"

export async function POST(request){
  const {name, password} = await request.json()

  const user = await readUser({
    name: name,
    password: password,
  },)
  
  return NextResponse.json({ok: !!user || false})
}

export async function GET(request){return new Response('', {status: 404})}
