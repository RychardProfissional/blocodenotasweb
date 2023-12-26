'use client'

import { useState } from 'react'
import { redirect } from 'next/navigation'
import { setCookie } from 'nookies'
import style  from './login.module.css'
import Input from '@/app/components/input'

export default function Login() {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  function checkLogin(e){
    e.preventDefault()

    const queryApi = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        password: password, 
      })
    }

    if (password && name)
    {
      fetch(`${process.env.URL_ROUTE_BASE}`, queryApi)
      .then(async function (response) {
        response = await response.json()

        if (response.ok) {
          const cookieOptions = {maxAge: 28800, path: '/'};

          setCookie(null, "INPUT_NAME", name, cookieOptions)
          setCookie(null, "INPUT_PASSWORD", password, cookieOptions)

          redirect('/user')
        }
        else setError(true)
      })
      .catch(e => {
        console.log(e)
        setError(true)
      })
    }
      
    setPassword('')
    setName('')
  }

  return (
    <>
      <form onSubmit={(e) => checkLogin(e)} className={style.form}>
        <h1>Login</h1>
        <Input onInput={(e) => setName(e.target.value)} label='Nome:' />
        <Input onInput={(e) => setPassword(e.target.value)} label='Senha:' />
        <Input type='submit' value='Entrar' />
      </form>
      <footer className={style.footer}>
        <a href='#'>Recuperar senha</a> | <a href='/auth/register'>Cadastrar-se</a>
      </footer>
    </>
  )
}