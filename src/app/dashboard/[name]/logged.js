"use client";

import { cookies } from "next/headers";

export default function Logged() {
  const cookieStore = cookies();

  return (
    <div>
      logado
      {cookieStore.getAll().map((co) => {
        <div>
          <div>{co.name}</div>
          <div>{co.value}</div>
        </div>;
      })}
    </div>
  );
}
