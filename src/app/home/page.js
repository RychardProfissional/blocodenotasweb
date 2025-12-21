"use client"

import Footer from "@/app/components/style/footer"
import style from "./home.module.css"

export default function Page() {
  return (
    <div className={style.hero}>
      <header className={style.header}>
        <div className={style.logo}>
          Bloco<span>Web</span>
        </div>
        <a
          className={`${style.nav_item} ${style.cta_button}`}
          href="/auth/login"
        >
          Entrar
        </a>
      </header>

      <main className={style.main_content}>
        <div className={style.title_container}>
          <h1 className={style.title}>
            Suas ideias,
            <br />
            Organizadas.
          </h1>
          <p className={style.subtitle}>
            Um espaço simples, elegante e seguro para suas anotações. Acesse de
            qualquer lugar, a qualquer momento.
          </p>
        </div>

        <div className={style.actions}>
          <a href="/auth/register" className={style.primary_btn}>
            Começar Agora
          </a>
          <a href="/auth/login" className={style.secondary_btn}>
            Já tenho conta
          </a>
        </div>
      </main>

      <Footer />
    </div>
  )
}
