'use client'

import {SubmitInput, Input} from "@/app/components/input"
import style from "./register.module.css"
import { useState } from "react"

export default function Register(){
    const [name, setName] = useState('')
    const [nameChecked, setNameChecked] = useState(false)

    const [email, setEmail] = useState('')
    const [emailCheked, setEmailCheked] = useState(false)

    const [password, setPassword] = useState('')
    const [passwordChecked, setPasswordChecked] = useState(false)

    const [passwordTwo, setPasswordTwo] = useState('')
    const [passwordTwoChecked, setPasswordTwoChecked] = useState(false)

    const [passwordChecks, setPasswordChecks] = useState({
        lengthMin: true,
        specialChar: true,
        lowercase: true,
        uppercase: true,
    })

    function registerUser(e) {
        e.preventDefault()
    }
    
    function handleName(n){
        setNameChecked((!n && n.indexOf(' ') != -1) || !n.length)
        setName(n)
    }

    function handleEmail(e){
        setEmailCheked(!/\S+@\S+\.\S+/.test(e) || !e.length)
        setEmail(e)
    }
   
    function handlePassword(p) {
        const pc = {
            lengthMin: p.length > 8,
            specialChar: /[^a-zA-Z0-9]/.test(p),
            lowercase: /a-z/.test(p),
            uppercase: /A-Z/.test(p)
        }

        setPasswordChecked(!Object.values(pc).every(v => v) || !p.length)
        setPasswordChecks(p)
        setPassword(p)
    }

    function handlePasswordTwo(pTwo){
        setPasswordTwoChecked(pTwo != password || !pTwo.length)
        setPasswordTwo(pTwo)
    }

    return (
        <>
            <form onSubmit={e => registerUser(e)} className={style.form}>
                <h1>Cadastro</h1>
                <Input onInput={e => handleName(e.target.value)} error={nameChecked}>Nome: </Input>
                <Input onInput={e => handleEmail(e.target.value)} error={emailCheked}>Email: </Input>
                <Input onInput={e => handlePassword(e.target.value)} error={passwordChecked} type="password">Senha: </Input>
                <div>
                    {/*aqui deve ficar a lista de verificações de senha*/}
                </div>
                <Input onInput={e => handlePasswordTwo(e.target.value)} error={passwordTwoChecked} type="password">Senha novamente: </Input>
                <SubmitInput value='cadastrar-se'/>
            </form>
            <footer className={style.footer}>
                <a href="#">Logar</a> <span>|</span> <a href="#">Recuperar conta</a>
            </footer>
        </>
    )
}