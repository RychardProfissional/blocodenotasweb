'use server'
import { NextResponse } from "next/server"

export async function GET(req){
  const {searchParams} = new URL(req.url)

  const loginParams = {
    name: searchParams.get('name'),
    password: searchParams.get('password')
  }

  if (!loginParams.name || !loginParams.password) return NextResponse.json({check: false})

  return NextResponse.json({check: true})
}