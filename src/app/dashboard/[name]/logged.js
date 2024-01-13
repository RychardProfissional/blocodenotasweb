"use client"

import DropDown from "@/app/components/functionalities/dropdown"
import Modal from "@/app/components/functionalities/modal"
import { BsPersonCircle } from "react-icons/bs"
import { Search } from "../components/search"
import { BiSolidHome, BiSearchAlt2 } from "react-icons/bi"
import Folder from "../components/folder"
import style from "./logged.module.css"
import Note from "../components/note"

export function Logged() {
  return (
    <div className={style.container}>
      <header className={style.header}>
        <div>dashboard</div>
        <DropDown
          DropElement={<BsPersonCircle className={style.profile_icon} />}
          className={style.profile}
          classMenu={style.profile_drop}
        >
          <div className={style.profile_drop_item}>teste</div>
          <div className={style.exit}>sair</div>
        </DropDown>
      </header>
      <main className={style.main}>
        <section className={style.menu}>
          <div className={style.menu_header}>
            <div className={style.menu_home}>
              <BiSolidHome />
              <div>HOME</div>
            </div>
            <Search
              listItens={{}}
              label={
                <div>
                  <BiSearchAlt2 />
                </div>
              }
              placeholder="pesquisar"
            />
          </div>
          <div className={style.menu_body}>
            <h3>Suas pastas</h3>
            <DropDown DropElement={<div>+</div>}>
              <Modal
                headerContent={[<div>salvar</div>]}
                value={<div>Criar nova pasta</div>}
              >
                {/* ---------- create folder */}
                <textarea className={style.create_nota_textarea} />
              </Modal>
              <Modal
                headerContent={[
                  <div>salvar</div>,
                  <input type="text" style={{ color: "white" }} />,
                ]}
                btnClass={style.create_note}
                value="Criar nova nota"
              >
                {/* --------- create note */}
                <textarea className={style.create_nota_textarea} />
              </Modal>
            </DropDown>
            {/* repetir até não ter mais pastas */}
            {/* ------------- read folder */}

            <Folder
              name="nome da pasta"
              src="#"
              alt="logo pasta"
              amount={45}
              onClick={() => console.log("folder")}
            />
            <Folder
              name="nome da pasta"
              src="#"
              alt="logo pasta"
              amount={45}
              onClick={() => console.log("folder")}
            />
          </div>
          <div className={style.menu_footer}>
            quer ver o codigo deste site? acesse meu <a href="#">github</a>
          </div>
        </section>
        {/* está section vai mudar a depender da pasta selecionada */}
        {/* estrutura base */}
        <section>
          {/* repetir */}
          {/* ---------- read folders */}

          <Folder
            name="nome da pasta"
            src="#"
            alt="logo pasta"
            amount={45}
            onClick={() => console.log("folder")}
          >
            {/* deve ter wrap, ou display grad */}
            {/* esta div deve se repetir*/}
            {/* --------- read notes */}
            <Note name="nome da anotação" id={2}>
              anotação qualquer
            </Note>
            <Note name="nome da anotação" id={2}>
              anotação qualquer
            </Note>
          </Folder>
          <Folder
            name="nome da pasta"
            src="#"
            alt="logo pasta"
            amount={45}
            onClick={() => console.log("folder")}
          >
            {/* deve ter wrap, ou display grad */}
            {/* esta div deve se repetir*/}
            {/* --------- read notes */}
            <Note name="nome da anotação" id={2}>
              anotação qualquer
            </Note>
          </Folder>
        </section>

        {/* esse sera o home da pagina */}
        {/* <section className={style.content}>
          <div>
            <div>
              <span>Nome da pasta</span>
              <div>quantidade de anotações</div>
            </div>
            <div>
              <Note name="nome da anotação" id={2}>
                anotação qualquer
              </Note>
              <Note name="nome da anotação" id={2}>
                anotação qualquer
              </Note>
            </div>
          </div>
        </section> */}
      </main>
    </div>
  )
}

/* 
  1 componetizar 
    1.1 "Fazer" o html ok
    1.2 Criar e testar funcionalidades
    1.3 Estilizar

  2 criar apis
    - logoff, finalizar login e colocar token na lista negra
    - busca, busca entre os nomes das pastas e notas
    - folders, retorna um array com as pastas
    - notas, retorna um array com as anotações de uma pasta
  --- todos devem verificar o token de authentificação e 
  --- ter testes unitarios

  3 testar os dois juntos
  4 estilizar
  5 otimizar ------ não é pra fazer isto antes.
*/
