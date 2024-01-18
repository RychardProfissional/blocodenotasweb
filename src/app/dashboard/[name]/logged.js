"use client"

import DropDown from "@/app/components/functionalities/dropdown"
import Modal from "@/app/components/functionalities/modal"
import { BsPersonCircle } from "react-icons/bs"
import { Search } from "../components/search"
import { BiSolidHome } from "react-icons/bi"
import style from "./logged.module.css"
import { useState } from "react"
import { AiOutlineFolderAdd } from "react-icons/ai"
import {
  FolderPres,
  FoldersPres,
  MenuFolders,
} from "../components/folders-presentation"

export function Logged({ userid }) {
  const [folders, setFolders] = useState([
    {
      id: 1,
      name: "Folder 1",
      notes: [
        {
          id: 1,
          title: "Note 1",
          text: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
        },
        {
          id: 2,
          title: "Note 2",
          text: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem IpsumPellentesque habitant...",
        },
        {
          id: 3,
          title: "Note 3",
          text: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem IpsumPellentesque habitant...",
        },
        {
          id: 4,
          title: "Note 4",
          text: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem IpsumPellentesque habitant...",
        },
        {
          id: 5,
          title: "Note 5",
          text: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem IpsumPellentesque habitant...",
        },
        {
          id: 6,
          title: "Note 6",
          text: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem IpsumPellentesque habitant...",
        },
      ],
    },
    {
      id: 2,
      name: "Folder 2",
      notes: [
        {
          id: 3,
          title: "Note 1",
          text: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem IpsumSed do eiusmod...",
        },
        {
          id: 4,
          title: "Note 2",
          text: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem IpsumUt enim ad minim...",
        },
      ],
    },
    {
      id: 3,
      name: "Folder 3",
      notes: [
        {
          id: 5,
          title: "Note 1",
          text: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem IpsumDuis aute irure...",
        },
        {
          id: 6,
          title: "Note 2",
          text: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem IpsumExcepteur sint...",
        },
      ],
    },
    {
      id: 4,
      name: "Folder 4",
      notes: [
        {
          id: 7,
          title: "Note 1",
          text: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem IpsumCurabitur pretium...",
        },
        {
          id: 8,
          title: "Note 2",
          text: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem IpsumSuspendisse non...",
        },
      ],
    },
    {
      id: 5,
      name: "Folder 5",
      notes: [
        {
          id: 9,
          title: "Note 1",
          text: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem IpsumNunc sed augue...",
        },
        {
          id: 10,
          title: "Note 2",
          text: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem IpsumPellentesque habitant...",
        },
      ],
    },
  ]) // retorno do folderAction.read
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

  // considerar isolar actions em arquivo separado

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

  // useEffect(() => {
  //   folderActions.read()
  // }, [])

  return (
    <div className={style.container}>
      <header className={style.header}>
        <div>dashboard</div>
        <DropDown
          value={<BsPersonCircle className={style.profile_icon} />}
          className={style.profile}
          classMenu={style.profile_drop}
        >
          <div className={style.profile_drop_item}>teste</div>
          <div className={style.exit}>sair</div>
        </DropDown>
      </header>
      {/* ------------------- */}
      <main className={style.main}>
        <section className={style.menu}>
          <header className={style.menu_header}>
            <div
              className={`${style.menu_home} ${style.menu_header_item}`.trim()}
              onClick={() => setActiveFolder(undefined)}
            >
              <BiSolidHome />
              <div>HOME</div>
            </div>

            {/* deixar de enfeite por enquanto*/}
            <Search
              listItens={{}}
              className={style.menu_header_item}
              placeholder="pesquisar"
            />
          </header>
          <div className={style.menu_body}>
            <div className={style.menu_body_header}>
              <h3>Suas pastas</h3>
              <DropDown
                value={
                  <AiOutlineFolderAdd className={style.create_folder_icon} />
                }
                className={style.drop_down}
              >
                <div className={style.drop_create_folder}>
                  <button className={style.create_folder}>salvar</button>
                  <input
                    className={style.input_create_folder}
                    placeholder="seila"
                  />
                </div>
              </DropDown>
            </div>
            <MenuFolders
              folders={folders}
              onClick={(position) => setActiveFolder(position)}
            />
          </div>
          <footer className={style.menu_footer}>
            <p>
              quer ver o codigo deste site? acesse meu <a href="#">github</a>
            </p>
          </footer>
        </section>
        <section className={style.viewFolder}>
          {activeFolder >= 0 ? (
            <FolderPres folder={folders[activeFolder]} />
          ) : (
            <FoldersPres
              folders={folders}
              onClick={(position) => setActiveFolder(position)}
            />
          )}
        </section>
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
