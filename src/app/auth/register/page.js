'use client'

import Input from "@/app/components/input"
import style from "./register.module.css"
import { BsCheckCircleFill, BsCircleFill } from "react-icons/bs";
import { useEffect, useState } from "react"
import { parseCookies, setCookie } from "nookies";
import { useRouter } from "next/router";

export default function Register(){

    useEffect(() => {
        const cookies = parseCookies()
        if('INPUT_NAME' in cookies && 'INPUT_PASSWORD' in cookies){
            useRouter().push('/')
        }
    },[])

    const [name, setName] = useState('')
    const [nameChecked, setNameChecked] = useState(false)

    const [email, setEmail] = useState('')
    const [emailCheked, setEmailCheked] = useState(false)

    const [password, setPassword] = useState('')
    const [passwordChecked, setPasswordChecked] = useState(false)

    const [passwordTwo, setPasswordTwo] = useState('')
    const [passwordTwoChecked, setPasswordTwoChecked] = useState(false)

    const [passwordChecks, setPasswordChecks] = useState({
        lengthMin: false,
        specialChar: false,
        lowercase: false,
        uppercase: false,
    })

    function registerUser(e) {
        e.preventDefault()

        if(nameChecked || emailCheked || passwordChecked || passwordTwoChecked){
            alert('por favor incira informações validas')
        }
        fetch(`${process.env.URL_ROUTE_BASE}/api/user/register`,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                password: password,
                email: email,
            })
        }).then((response)=> {
            response = response.json()

            if(response.ok)
            {
                const cookieOptions = {maxAge: 28800, path: '/'};

                setCookie(null, "INPUT_NAME", name, cookieOptions)
                setCookie(null, "INPUT_PASSWORD", password, cookieOptions)

                useRouter().push('/user')
            }
            else{
                alert(`Error`)
                setNameChecked(response.error.name)
                setPasswordChecked(response.error.password)
            } 
        }).catch(e => {
            console.log(e)
            alert('erro ao tentar fazer requisição a api')
        })

        setPassword('')
        setPasswordTwo('')
    }
    
    function handleName(n){
        setNameChecked((!n && n.indexOf(' ') != -1) && n.length)
        setName(n)
    }

    function handleEmail(e){
        setEmailCheked(!/\S+@\S+\.\S+/.test(e) && e.length)
        setEmail(e)
    }
   
    function handlePassword(p) {
        const pc = {
            lengthMin: p.length > 8,
            specialChar: /[^a-zA-Z0-9]/.test(p),
            lowercase: /[a-z]/.test(p),
            uppercase: /[A-Z]/.test(p)
        }

        setPasswordChecked(!Object.values(pc).every(v => v) && p.length)
        setPasswordChecks(pc)
        setPassword(p)
    }

    function handlePasswordTwo(pTwo){
        setPasswordTwoChecked(pTwo != password && pTwo.length)
        setPasswordTwo(pTwo)
    }

    return (
        <>
            <form onSubmit={e => registerUser(e)} className={style.form}>
                <h1>Cadastro</h1>
                <Input value={name} onInput={e => handleName(e.target.value)} error={nameChecked} label="Nome:"/>
                <Input value={email} onInput={e => handleEmail(e.target.value)} error={emailCheked} label="Email:" />
                <Input value={password} onInput={e => handlePassword(e.target.value)} error={passwordChecked} type="password dropDown" label="Senha:">
                    <div className={style.password_item}>
                        {passwordChecks.lengthMin? <BsCheckCircleFill fill='green'/>:<BsCircleFill fill='red'/>}
                        <div>A senha tem que ter pelo menos 8 caracteres</div>
                    </div>
                    <div className={style.password_item}>
                        {passwordChecks.specialChar? <BsCheckCircleFill fill='green'/>:<BsCircleFill fill='red'/>}
                        <div>A senha deve conter pelo menos 1 caracter especial</div>
                    </div>
                    <div className={style.password_item}>
                        {passwordChecks.uppercase? <BsCheckCircleFill fill='green'/>:<BsCircleFill fill='red'/>}
                        <div>A senha deve conter pelo menos 1 letra minuscula</div>
                    </div>
                    <div className={style.password_item}>
                        {passwordChecks.lowercase? <BsCheckCircleFill fill='green'/>:<BsCircleFill fill='red'/>}
                        <div>A senha deve conter pelo menos 1 letra maiuscula</div>
                    </div>
                </Input>
                <Input value={passwordTwo}onInput={e => handlePasswordTwo(e.target.value)} error={passwordTwoChecked} type="password" label="Senha novamente:" />
                <Input type='submit'value='cadastrar-se'/>
            </form>
            <footer className={style.footer}>
                <a href="#">Logar</a> <span>|</span> <a href="#">Recuperar conta</a>
            </footer>
        </>
    )
}