"use server"

import { cookies } from "next/headers"
import { Logged } from "./logged"
import NoLogged from "./nologged"

export default async function Page({ params }) {
  const urlName = params.name
  // const token = cookies().get("TOKEN");

  // let login = false;

  // if (token) {
  //   await fetch("http://localhost:3000/api/auth/check", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(token),
  //   })
  //     .then(async (res) => {
  //       login = (await res.json()).auth;

  //       !login && cookies.delete("TOKEN");
  //     })
  //     .catch((err) => console.log(err));
  // }

  return true ? <Logged /> : <NoLogged name={urlName} />
}
