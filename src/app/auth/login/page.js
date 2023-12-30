"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import style from "./login.module.css";
import Input from "@/app/components/input";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function checkLogin(e) {
    e.preventDefault();
    if (!name || !password) {
      alert("por favor preencha todos os campos");
      return;
    }
    let auth = false;

    await fetch(`http://localhost:3000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        password: password,
      }),
    })
      .then(async (res) => {
        auth = (await res.json()).auth;
      })
      .catch((err) => {
        console.log(err);
        alert("[ERRO] não foi possivel acessar a api");
      });

    if (auth) router.push(`/dashboard/${name}`);
    else alert("Usuário ou senha incorretos");

    setPassword("");
  }

  return (
    <>
      <form onSubmit={(e) => checkLogin(e)} className={style.form}>
        <h1>Login</h1>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="Nome:"
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Senha:"
        />
        <Input type="submit" value="Entrar" />
      </form>
      <footer className={style.footer}>
        <a href="#">Recuperar senha</a> |{" "}
        <a href="/auth/register">Cadastrar-se</a>
      </footer>
    </>
  );
}
