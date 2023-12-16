'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { setCookie } from 'nookies'
import style  from './page.module.css'
import Input from '../../components/input'

export default function Login() {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const router = useRouter()

  function checkLogin(e){
    e.preventDefault()

    const queryApi = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    if (password && name)
    {
      fetch(`/api/v1/checkUser?name=${name}&password=${password}`, queryApi)
      .then(response => {
        response = response.json()

        if (response.check) {
          const cookieOptions = {maxAge: 28800, path: '/home'};

          setCookie(null, "INPUT_NAME", name, cookieOptions)
          setCookie(null, "INPUT_PASSWORD", password, cookieOptions)

          router.push('/home')
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
        <Input placeholder='nome aleatorio' onInput={(e) => setName(e.target.value)}>Nome: </Input>
        <Input placeholder='••••••••' onInput={(e) => setPassword(e.target.value)}>Senha: </Input>
        <input type='submit' value='Entrar' />
      </form>
      <footer className={style.footer}>
        <a href='#'>Recuperar senha</a> | <a href='/auth/register'>Cadastrar-se</a>
      </footer>
    </>
  )
}