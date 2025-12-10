"use client"

import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import style from "./login.module.css"
import InputForm from "@/app/auth/components/input-form"

export default function Login() {
  const router = useRouter()

  async function checkLogin(formData) {
    const name = formData.get("name")
    const password = formData.get("password")

    if (!name || !password) {
      alert("Por favor, preencha todos os campos")
      return
    }

    const res = await signIn("credentials", {
      name: name,
      password: password,
      redirect: false,
    })

    if (res?.error) {
      alert("Usuário ou senha incorretos")
    } else {
      router.push(`/dashboard/${name}`)
    }
  }

  return (
    <>
      <form action={checkLogin} className={style.form}>
        <h1>Bem-vindo</h1>
        <InputForm name="name" label="Nome de Usuário" placeholder=" " />
        <InputForm
          name="password"
          label="Senha"
          type="password"
          placeholder=" "
        />
        <InputForm type="submit" value="Entrar" />
      </form>
      <footer className={style.footer}>
        Não tem uma conta? <a href="/auth/register">Cadastre-se</a>
      </footer>
    </>
  )
}
