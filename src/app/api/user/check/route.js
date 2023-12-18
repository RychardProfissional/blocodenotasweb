'use server'

import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import NotFound from "@/app/not-found"

export async function POST(request){
  const {name, password} = await request.json()
  const prisma = new PrismaClient()

  // verificar se o prisma evita sql inject

  const User = await prisma.user.findUnique({
    where: {
      name: name,
      password: password,
    },
  })

  return NextResponse.json({ok: !!User || false})
}

export async function GET(request){return new Response('', {status: 404})}
