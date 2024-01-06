"use client"

import InputForm from "@/app/auth/components/input-form"
import style from "./register.module.css"
import { BsCheckCircleFill, BsCircleFill } from "react-icons/bs"
import { useState } from "react"
import { useRouter } from "next/navigation"
import DropDown from "@/app/components/functionalities/dropdown"

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
      alert("por favor incira informações validas")
      return
    }

    let auth = false

    await fetch(`http://localhost:3000/api/auth/register`, {
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
      .then(async (response) => {
        auth = (await response.json()).auth
        if (auth) router.push(`/dashboard/${name}`)
        else alert(`[ERRO] Impossivel acessar a api no momento`)
      })
      .catch((e) => {
        console.log(e)
        alert("[ERRO] Impossivel acessar a api no momento")
      })

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
    confirm ? <BsCheckCircleFill fill="green" /> : <BsCircleFill fill="red" />

  return (
    <>
      <form onSubmit={(e) => registerUser(e)} className={style.form}>
        <h1>Cadastro</h1>
        <InputForm
          className={style.input}
          value={name}
          onInput={(e) => handleName(e.target.value)}
          error={nameChecked}
          label="Nome:"
        />
        <InputForm
          className={style.input}
          value={email}
          onInput={(e) => handleEmail(e.target.value)}
          error={emailCheked}
          label="Email:"
        />
        <DropDown
          DropElement={
            <InputForm
              className={style.input}
              value={password}
              onInput={(e) => handlePassword(e.target.value)}
              error={passwordChecked}
              type="password"
              label="Senha:"
            />
          }
          classMenu={style.password_menu}
          eventDrop="onFocus"
          color="rgb(var(--color-white-1))"
        >
          <div className={style.password_item}>
            <ConfirmIcon confirm={passwordChecks.lengthMin} />
            <div>A senha tem que ter pelo menos 8 caracteres</div>
          </div>
          <div className={style.password_item}>
            <ConfirmIcon confirm={passwordChecks.specialChar} />
            <div>A senha deve conter pelo menos 1 caracter especial</div>
          </div>
          <div className={style.password_item}>
            <ConfirmIcon confirm={passwordChecks.uppercase} />
            <div>A senha deve conter pelo menos 1 letra minuscula</div>
          </div>
          <div className={style.password_item}>
            <ConfirmIcon confirm={passwordChecks.lowercase} />
            <div>A senha deve conter pelo menos 1 letra maiuscula</div>
          </div>
        </DropDown>
        <InputForm
          className={style.input}
          value={passwordTwo}
          onInput={(e) => handlePasswordTwo(e.target.value)}
          error={passwordTwoChecked}
          type="password"
          label="Senha novamente:"
        />
        <InputForm className={style.input} type="submit" value="cadastrar-se" />
      </form>
      <footer className={style.footer}>
        <a href="/auth/login">Logar</a> <span>|</span> <a href="#">Recuperar conta</a>
      </footer>
    </>
  )
}
