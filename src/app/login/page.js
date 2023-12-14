'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { setCookie } from 'nookies'
import style  from './page.module.css'

export default function Login() {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const router = useRouter()

  async function checkLogin(e){
    e.preventDefault()
    const queryApi = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    // const checkUser = await fetch(`/api/v1/checkUser?name=${name}&password=${password}`, queryApi)
    // const check = await checkUser.json() 

    // if (check.check){
    //   router.push('/home')
    // }
    // else setError(true)

    // setPassword('')
    // setName('') 
  }
  
  return (
    <main className={style.main}>
      <div className={style.content}>
        <form onSubmit={(e) => checkLogin(e)} className={style.form}>
          <h1>Login</h1>
          <label htmlFor='name' className={style.input_content}>
            <span>Nome: </span>
            <input id='name' type='text' value={name} onInput={(e) => setName(e.target.value)} placeholder='nome de usuário'/>
          </label>
          <label htmlFor='password' className={style.input_content}>
            <span>Senha: </span>
            <input id='password' type='password' value={password} placeholder='••••••••' onInput={(e) => setPassword(e.target.value)}/>
          </label>
          <input type='submit' value='Entrar' className={style.input_content} />
        </form>
        <footer className={style.footer}>
          <a href='#'>Recuperar senha</a> | <a href='#'>Cadastrar-se</a>
        </footer>
      </div>
    </main>
  )
}