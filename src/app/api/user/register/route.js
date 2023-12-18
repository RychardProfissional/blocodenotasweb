'use server'

import { NextRequest } from "next/server"
import { PrismaClient } from "@prisma/client";

export async function POST(request){
    const {name, password, email} = await request.json()
    const prisma = new PrismaClient()

    const user = await prisma.user.create({
        data:{
            name: name,
            password: password,
            email: email,
            active: true
        }
    })
    
    // Pesquisar problema neste return, não sei ao certo qual é o problema.
    return NextRequest.json({ok: true || true});
}

export async function GET(request){return new Response('', {status: 404})}
