'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { setCookie} from 'nookies'

export default function Home() {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('password')

  const router = useRouter()

  const setCookiesSession = () => {
    setCookie(null, 'INPUT_NAME', name)
    setCookie(null, 'INPUT_PASSWORD', password)
    
    router.push('/home/'+ name)

    setName('') 
    setPassword('')
  }
  
  return (
    <main>
      <div>
        <label for='name'>
          <span>Nome: </span>
          <input id='name' type='text' onInput={(e) => setName(e.target.value)} placeholder='nome de usuário'/>
        </label>
        <label for='password'>
          <span>Senha: </span>
          <input id='password' type='text' placeholder='********' onInput={(e) => setPassword(e.target.value)}/>
        </label>
        <input onClick={() => setCookiesSession()}type='submit' value='Entrar' />
      </div>
      <footer>
        <a href='#'>Recuperar senha</a> | <a href='#'>Cadastrar-se</a>
      </footer>
    </main>
  )
}