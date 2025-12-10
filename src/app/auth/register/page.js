"use client"

import InputForm from "@/app/auth/components/input-form"
import style from "./register.module.css"
import { BsCheckCircleFill, BsCircleFill } from "react-icons/bs"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"

export default function Register() {
  const router = useRouter()

  const [name, setName] = useState("")
  const [nameChecked, setNameChecked] = useState(false)

  const [email, setEmail] = useState("")
  const [emailCheked, setEmailCheked] = useState(false)

  const [password, setPassword] = useState("")
  const [passwordChecked, setPasswordChecked] = useState(false)

  const [passwordTwo, setPasswordTwo] = useState("")
  const [passwordTwoChecked, setPasswordTwoChecked] = useState(false)

  const [passwordChecks, setPasswordChecks] = useState({
    lengthMin: false,
    specialChar: false,
    lowercase: false,
    uppercase: false,
  })

  async function registerUser(e) {
    e.preventDefault()

    if (nameChecked || emailCheked || passwordChecked || passwordTwoChecked) {
      alert("Por favor, corrija os erros no formulário.")
      return
    }

    const res = await fetch(`/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        password: password,
        email: email,
      }),
    })

    const data = await res.json()

    if (data.success) {
      // Auto login
      const loginRes = await signIn("credentials", {
        name: name,
        password: password,
        redirect: false,
      })

      if (loginRes?.error) {
        router.push("/auth/login")
      } else {
        router.push(`/dashboard/${name}`)
      }
    } else {
      alert("Erro ao cadastrar. Tente novamente.")
    }

    setPassword("")
    setPasswordTwo("")
  }

  function handleName(n) {
    setNameChecked(!n && n.indexOf(" ") != -1 && n.length)
    setName(n)
  }

  function handleEmail(e) {
    setEmailCheked(!/\S+@\S+\.\S+/.test(e) && e.length)
    setEmail(e)
  }

  function handlePassword(p) {
    const pc = {
      lengthMin: p.length > 8,
      specialChar: /[^a-zA-Z0-9]/.test(p),
      lowercase: /[a-z]/.test(p),
      uppercase: /[A-Z]/.test(p),
    }

    setPasswordChecked(!Object.values(pc).every((v) => v) && p.length)
    setPasswordChecks(pc)
    setPassword(p)
  }

  function handlePasswordTwo(pTwo) {
    setPasswordTwoChecked(pTwo != password && pTwo.length)
    setPasswordTwo(pTwo)
  }

  const ConfirmIcon = ({ confirm }) =>
    confirm ? (
      <BsCheckCircleFill fill="var(--color-success)" />
    ) : (
      <BsCircleFill fill="var(--color-text-muted)" />
    )

  return (
    <>
      <form onSubmit={(e) => registerUser(e)} className={style.form}>
        <h1>Criar Conta</h1>

        <InputForm
          value={name}
          onInput={(e) => handleName(e.target.value)}
          error={nameChecked}
          label="Nome de Usuário"
          placeholder=" "
        />

        <InputForm
          value={email}
          onInput={(e) => handleEmail(e.target.value)}
          error={emailCheked}
          label="Email"
          type="email"
          placeholder=" "
        />

        <div className={style.input_group}>
          <InputForm
            value={password}
            onInput={(e) => handlePassword(e.target.value)}
            error={passwordChecked}
            type="password"
            label="Senha"
            placeholder=" "
          />

          <div className={style.password_requirements}>
            <div className={style.requirement_item}>
              <ConfirmIcon confirm={passwordChecks.lengthMin} />
              <span>Mínimo de 8 caracteres</span>
            </div>
            <div className={style.requirement_item}>
              <ConfirmIcon confirm={passwordChecks.specialChar} />
              <span>Pelo menos 1 caractere especial</span>
            </div>
            <div className={style.requirement_item}>
              <ConfirmIcon confirm={passwordChecks.uppercase} />
              <span>Pelo menos 1 letra maiúscula</span>
            </div>
            <div className={style.requirement_item}>
              <ConfirmIcon confirm={passwordChecks.lowercase} />
              <span>Pelo menos 1 letra minúscula</span>
            </div>
          </div>
        </div>

        <InputForm
          value={passwordTwo}
          onInput={(e) => handlePasswordTwo(e.target.value)}
          error={passwordTwoChecked}
          type="password"
          label="Confirmar Senha"
          placeholder=" "
        />

        <InputForm type="submit" value="Cadastrar" />
      </form>

      <footer className={style.footer}>
        Já tem uma conta? <a href="/auth/login">Entrar</a>
      </footer>
    </>
  )
}
