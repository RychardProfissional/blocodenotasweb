"use server";

import { cookies } from "next/headers";
import Logged from "./logged";
import NoLogged from "./nologged";

export default async function Page({ params }) {
  const urlName = params.name;
  const cookieStore = cookies();
  const user = {
    name: cookieStore.get("INPUT_NAME").value,
    password: cookieStore.get("INPUT_PASSWORD").value,
  };

  var login = false;

  if (!Object.values(user).some((x) => !x)) {
    await fetch("http://localhost:3000/api/user/read", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then(async (res) => {
        login = await res.json().ok;

        if (!login) {
          cookies().delete("INPUT_NAME");
          cookies().delete("INPUT_PASSWORD");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return login ? <Logged name={urlName} /> : <NoLogged name={urlName} />;
}
