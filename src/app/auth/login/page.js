'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { setCookie } from 'nookies'
import style  from './login.module.css'
import Input from '@/app/components/input'

export default function Login() {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  function checkLogin(e){
    e.preventDefault()
    
    if (password && name)
    {
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
      
      fetch(`http://localhost:3000/api/user/check`, queryApi)
      .then(async function (response) {
        console.log('ok')
        const {ok} = await response.json()
        
        if (ok) {
          const cookieOptions = {maxAge: 28800, path: '/'};
          
          setCookie(null, "INPUT_NAME", name, cookieOptions)
          setCookie(null, "INPUT_PASSWORD", password, cookieOptions)
          
          router.push(`/${name}`)
        }
        else alert('senha ou usuário incorretos!')
      })
      .catch(e => {
        console.log(e)
        alert('erro ao tentar acessar api')
      })
    }
  }

  return (
    <>
      <form onSubmit={(e) => checkLogin(e)} className={style.form}>
        <h1>Login</h1>
        <Input value={name} onChange={(e) => setName(e.target.value)} label='Nome:' />
        <Input value={password} onChange={(e) => setPassword(e.target.value)} label='Senha:' />
        <Input type='submit' value='Entrar' />
      </form>
      <footer className={style.footer}>
        <a href='#'>Recuperar senha</a> | <a href='/auth/register'>Cadastrar-se</a>
      </footer>
    </>
  )
}