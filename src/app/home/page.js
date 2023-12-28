'use client'

import { useRouter } from 'next/navigation'
import { parseCookies } from 'nookies'
import { useEffect } from 'react'
import Footer from '@/app/components/footer'
import style from './home.module.css'

export default function Page() {
  const router = useRouter()
  useEffect(() => {
    const cookies = parseCookies()
    if('INPUT_NAME' in cookies && 'INPUT_PASSWORD' in cookies){
      console.log(cookies)
    }
  },[])
  return (
      <div className={style.hero}>
        <header className={style.header}>
          <nav className={style.nav}>
            <a className={style.nav_item} href='#'>Sobre</a>
            <a className={style.nav_item} href='/auth/login'>Entrar</a>
            <a className={style.nav_item} href='/auth/register'>Cadastre-se</a>
          </nav>
        </header>
        <div className={style.title}>
          BLOCO DE NOTAS WEB
        </div>
        <Footer />
      </div>
    )
}