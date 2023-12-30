import { readUser } from "@/database/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  console.log("api checkuser acessada");

  const params = await req.json();
  const user = await readUser(params);

  return NextResponse.json({ ok: !!user });
}

export const GET = async (req) => new Response("", { status: 404 });
