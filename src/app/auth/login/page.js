'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
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
      method: 'GET',
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
      .then(response => {
        response = response.json()

        if (response.ok) {
          const cookieOptions = {maxAge: 28800, path: '/'};

          setCookie(null, "INPUT_NAME", name, cookieOptions)
          setCookie(null, "INPUT_PASSWORD", password, cookieOptions)

          useRouter().push('/user')
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
        <Input onInput={(e) => setName(e.target.value)} value='Nome:' />
        <Input onInput={(e) => setPassword(e.target.value)} value='Senha:' />
        <Input type='submit' value='Entrar' />
      </form>
      <footer className={style.footer}>
        <a href='#'>Recuperar senha</a> | <a href='/auth/register'>Cadastrar-se</a>
      </footer>
    </>
  )
}