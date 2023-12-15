'use server'
import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

export async function POST(request){
  const {name, password} = await request.json()
  const prisma = new PrismaClient()

  const User = await prisma.user.findUnique({
    where: {
      nome: name,
      password: password,
    },
  })

  return NextResponse.json({check: !!User || false})
}