"use client"

import DropDown from "@/app/components/functionalities/dropdown"
import Modal from "@/app/components/functionalities/modal"
import { BsPersonCircle } from "react-icons/bs"
import { Search } from "../components/search"
import { BiSolidHome, BiSearchAlt2 } from "react-icons/bi"
import Folder from "../components/folder"
import style from "./logged.module.css"
import Note from "../components/note"
import { useState } from "react"

export function Logged({ userid, username }) {
  const [folders, setFolders] = useState([{}]) // retorno do folderAction.read
  const [activeFolder, setActiveFolder] = useState(undefined) // id do folder ativo, caso seja undefined é igual ao home

  const baseFetch = async (path, data) => {
    return await fetch(`${process.env.API_ROUTE}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
  }

  const folderActions = {
    create(name) {
      const newFolders = folders
      const promise = baseFetch("/dashboard/folder/CREATE", { userid, name })

      setFolders([
        ...newFolders,
        { id: undefined, name: name, notes: undefined },
      ]) // fazer preview com base no id undefined

      promise
        .then((res) => res.json())
        .then((res) =>
          setFolders([
            ...newFolders,
            { id: res.id, name: res.name, notes: res.notes },
          ])
        )
    },

    read() {
      baseFetch("/dashboard/folder/READ", { userid })
        .then((res) => res.json())
        .then((res) => setFolders(res))
    },

    update(id, name) {
      const newFolders = folders
      const i = newFolders.findIndex((e) => e.id === id)

      if (i == -1) return

      newFolders[i].name = name
      baseFetch("/dashboard/folder/UPDATE", { id, name })
      setFolders(newFolders)
    },

    delete(id) {
      baseFetch("/dashboard/folder/DELETE", { id })
      setFolders([...folders.filter((e) => e.id != id)])
    },
  }

  const noteActions = {
    create(folderid, title, text) {
      const copyFolders = folders
      const i = copyFolders.findIndex((e) => e.id === folderid)

      if (i == -1) return

      const newNotes = copyFolders[i].notes
      const promise = baseFetch("/dashboard/note/CREATE", {
        folderid,
        title,
        text,
      })

      copyFolders[i].notes.push({ id: undefined, title, text })
      setFolders(copyFolders)

      promise
        .then((res) => res.json())
        .then((res) => {
          newNotes.push(res)
          copyFolders[i] = newNotes
          setFolders(copyFolders)
        })
    },

    update(id, fId, { folderid, title, text }) {
      const copyFolders = folders
      const folderIndex = copyFolders.findIndex((e) => e.id === fId)
      const noteIndex = copyFolders[folderIndex].notes.findIndex(
        (e) => e.id === id
      )

      if (folderIndex === -1 || noteIndex === -1) return

      baseFetch("/dashboard/note/UPDATE", { id, folderid, title, text })

      const copyNote = copyFolders[folderIndex].notes[noteIndex]

      copyFolders[folderIndex].notes[noteIndex] = {
        id,
        folderid: folderid || fId,
        title: title || copyNote.title,
        text: text || copyNote.text,
      }

      setFolders(copyFolders)
    },

    delete(id, fId) {
      const copyFolders = folders
      const folderIndex = copyFolders.findIndex((e) => e.id === fId)
      const noteIndex = copyFolders[folderIndex].notes.findIndex(
        (e) => e.id === id
      )

      if (folderIndex === -1 || noteIndex === -1) return

      copyFolders[folderIndex].notes.splice(noteIndex, 1)
      baseFetch("/dashboard/note/DELETE", { id })
    },
  }

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
          <header className={style.menu_header}>
            <div
              className={style.menu_home}
              onClick={() => setActiveFolder(undefined)}
            >
              <BiSolidHome />
              <div>HOME</div>
            </div>

            {/* deixar de enfeite por enquanto*/}

            <Search
              listItens={{}}
              label={
                <div>
                  <BiSearchAlt2 />
                </div>
              }
              placeholder="pesquisar"
            />
          </header>
          <div className={style.menu_body}>
            <div className={style.container_create_folder}>
              <h3>Suas pastas</h3>
              <Modal
                headerContent={[
                  <div className={style.create_folder}>salvar</div>,
                ]}
                value={<div>+{/* crinar nova pasta */}</div>}
              >
                <input className={style.input_create_folder} />
              </Modal>
            </div>
            {/* 
            {folders &&
              folders.map((folder) => (
                <Folder
                  name={folder.name}
                  src={folder.src || undefined}
                  alt="logo pasta"
                  amount={folder.notes.length}
                  onClick={() => console.log("folder")}
                />
              ))
            } 
            */}

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
          <footer className={style.menu_footer}>
            <p>
              quer ver o codigo deste site? acesse meu <a href="#">github</a>
            </p>
          </footer>
        </section>
        <section>
          {/* repetir */}
          {/* ---------- read folders */}
          {}
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
            <Note title="nome da anotação" id={2}>
              anotação qualquer
            </Note>
            <Note title="nome da anotação" id={2}>
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
            <Note title="nome da anotação" id={2}>
              anotação qualquer
            </Note>
          </Folder>
        </section>

        {/* <section className={style.content}>
          <div>
            <div>
              <span>Nome da pasta</span>
              <div>quantidade de anotações</div>
            </div>
            <div>
              <Note title="nome da anotação" id={2}>
                anotação qualquer
              </Note>
              <Note title="nome da anotação" id={2}>
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
