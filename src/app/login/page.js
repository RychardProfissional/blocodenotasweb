'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { setCookie} from 'nookies'

export default function Home() {
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

    const checkUser = await fetch(`/api/v1/checkUser?name=${name}&password=${password}`, queryApi)
    const check = await checkUser.json() 
    console.log(check.check)

    setPassword('')
    setName('') 
  }
  
  return (
    <main>
      <form onSubmit={(e) => checkLogin(e)} className={error? 'error': ''}>
        <label htmlFor='name'>
          <span>Nome: </span>
          <input id='name' type='text' value={name} onInput={(e) => setName(e.target.value)} placeholder='nome de usuário'/>
        </label>
        <label htmlFor='password'>
          <span>Senha: </span>
          <input id='password' type='text' value={password} placeholder='********' onInput={(e) => setPassword(e.target.value)}/>
        </label>
        <input type='submit' value='Entrar' />
      </form>
      <footer>
        <a href='#'>Recuperar senha</a> | <a href='#'>Cadastrar-se</a>
      </footer>
    </main>
  )
}