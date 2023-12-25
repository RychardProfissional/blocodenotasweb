'use client'

import { BsGithub, BsLinkedin, BsEnvelope} from "react-icons/bs"
import style from './page.module.css'

export default function Page() {
  return (
      <div className={style.hero}>
        <header className={style.header}>
          <nav className={style.nav}>
            <a className={style.nav_item} href='#'>Sobre</a>
            <a className={style.nav_item} href='/auth/login'>Login</a>
            <a className={style.nav_item} href='/auth/register'>Cadastre-se</a>
          </nav>
        </header>
        <div className={style.title}>
          BLOCO DE NOTAS WEB
        </div>
        <footer className={style.footer}>
            <span>Rychard Antony</span>
          <div className={style.social_media}>
            <div className={style.media_icon}><a href='#'><BsGithub width={50} height={50}/></a></div>
            <div className={style.media_icon}><a href='#'><BsLinkedin/></a></div>
            <div className={style.media_icon}><a href='#'><BsEnvelope/></a></div>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 980 980" height={16} fill="white">
            <circle cx="490" cy="490" r="440" fill="none" stroke="white" stroke-width="100"/>
            <path d="M219,428H350a150,150 0 1 1 0,125H219a275,275 0 1 0 0-125z"/>
          </svg>
            {/* licensas e outros */}
        </footer>
      </div>
    )
}