"use client";

import { cookies } from "next/headers";

export default function NoLogged() {
  const cookieStore = cookies();

  return (
    <div>
      não logado
      {cookieStore.getAll().map((co) => {
        <div>
          <div>{co.name}</div>
          <div>{co.value}</div>
        </div>;
      })}
    </div>
  );
}
