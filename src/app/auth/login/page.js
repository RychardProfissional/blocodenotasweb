"use client"

import { useRouter } from "next/navigation"
import style from "./login.module.css"
import InputForm from "@/app/auth/components/input-form"

export default function Login() {
  const router = useRouter()

  async function checkLogin(formData) {
    const name = formData.get("name")
    const password = formData.get("password")
    console.log(name)

    if (!name || !password) {
      alert("por favor preencha todos os campos")
      return
    }
    let auth = false

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
        auth = (await res.json()).auth
      })
      .catch((err) => {
        console.log(err)
        alert("[ERRO] não foi possivel acessar a api")
      })

    if (auth) router.push(`/dashboard/${name}`)
    else alert("Usuário ou senha incorretos")
  }

  return (
    <>
      <form action={checkLogin} className={style.form}>
        <h1>Login</h1>
        <InputForm name="name" label="Nome:" />
        <InputForm name="password" label="Senha:" type="password" />
        <InputForm type="submit" value="Entrar" />
      </form>
      <footer className={style.footer}>
        <a href="#">Recuperar senha</a> | <a href="/auth/register">Cadastrar-se</a>
      </footer>
    </>
  )
}
