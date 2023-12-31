import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req) {
  var user = await req.json();
  let auth = false;

  user = {
    name: user.name || false,
    password: user.password || false,
  };

  if (!Object.values(user).some((x) => !x)) {
    await fetch(`http://localhost:3000/api/user/read`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then(async (res) => {
        auth = (await res.json()).ok;
      })
      .catch((err) => console.log(err));

    if (auth) {
      const cookieOptions = { path: "/" };

      cookies().set("INPUT_NAME", user.name, cookieOptions);
      cookies().set("INPUT_PASSWORD", user.password, cookieOptions);
    }
  }

  console.log(auth);

  return NextResponse.json({ auth: auth });
}
