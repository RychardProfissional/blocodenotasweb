import { createUser } from "@/database/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  console.log("api create acessada");

  const params = await req.json();
  const user = await createUser(params);

  return NextResponse.json({ ok: !!user });
}

export const GET = async (req) => new Response("", { status: 404 });
