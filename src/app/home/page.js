'use client'

import style from './home.module.css'
import Footer from '@/app/components/footer'

export default function Page() {
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