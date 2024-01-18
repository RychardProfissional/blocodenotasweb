"use client"

import Footer from "@/app/components/style/footer"
import style from "./home.module.css"

export default function Page() {
  return (
    <div className={style.hero}>
      <header className={style.header}>
        <p style={{ color: "red" }}>
          ainda em desenvolvimento, funcionalidades incompletas
        </p>
        <nav className={style.nav}>
          <a className={style.nav_item} href="#">
            Sobre
          </a>
          <a className={style.nav_item} href="/auth/login">
            Entrar
          </a>
          <a className={style.nav_item} href="/auth/register">
            Cadastre-se
          </a>
        </nav>
      </header>
      <div className={style.title}>
        <span className={style.notePad}>Bloco de Notas</span>
        <span className={style.web}>
          <span className={style.emphasis}>W</span>EB
        </span>
      </div>
      <Footer />
    </div>
  )
}
