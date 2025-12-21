"use client"

import { useState, useEffect, useMemo } from "react"
import { signOut, useSession } from "next-auth/react"
import {
  BiHomeAlt,
  BiFolder,
  BiPlus,
  BiSearch,
  BiLogOut,
  BiMenu,
  BiXCircle,
  BiTrash,
} from "react-icons/bi"
import style from "./logged.module.css"
import { FolderPres, FoldersPres } from "../components/folders-presentation"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

export function Logged() {
  const { data: session } = useSession()
  const [folders, setFolders] = useState([])
  const [activeFolder, setActiveFolder] = useState(undefined)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const route = useRouter();

  const baseFetch = async (path, method = "GET", data = null) => {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    }
    if (data) {
      options.body = JSON.stringify(data)
    }
    return await fetch(`/api${path}`, options)
  }

  const folderActions = {
    create(name) {
      baseFetch("/folders", "POST", { name })
        .then((res) => res.json())
        .then((newFolder) => {
          if (newFolder.error) return toast.error(newFolder.error)
          setFolders([...folders, { ...newFolder, notes: [] }])
          toast.success("Pasta criada com sucesso!")
        })
        .catch((e) => {
          console.error(e)
          toast.error("Erro ao criar pasta")
        })
    },

    read() {
      baseFetch("/folders")
        .then((res) => res.json())
        .then((res) => {
          if (Array.isArray(res)) setFolders(res)
        })
        .catch((e) => console.error(e))
    },

    update(id, name) {
      baseFetch(`/folders/${id}`, "PATCH", { name })
        .then((res) => res.json())
        .then((updatedFolder) => {
          if (updatedFolder.error) return toast.error(updatedFolder.error)
          setFolders(
            folders.map((f) =>
              f.id === id ? { ...f, name: updatedFolder.name } : f
            )
          )
          toast.success("Pasta atualizada!")
        })
        .catch(() => toast.error("Erro ao atualizar pasta"))
    },

    delete(id) {
      if (!confirm("Tem certeza que deseja excluir esta pasta?")) return

      baseFetch(`/folders/${id}`, "DELETE")
        .then(() => {
          setFolders(folders.filter((f) => f.id !== id))
          if (activeFolder !== undefined && folders[activeFolder]?.id === id) {
            setActiveFolder(undefined)
          }
          toast.success("Pasta excluída!")
        })
        .catch(() => toast.error("Erro ao excluir pasta"))
    },
  }

  const noteActions = {
    create(folderid, title, text) {
      baseFetch("/notes", "POST", { folderid, title, text })
        .then((res) => res.json())
        .then((newNote) => {
          if (newNote.error) return toast.error(newNote.error)
          const newFolders = [...folders]
          const folderIndex = newFolders.findIndex((f) => f.id === folderid)
          if (folderIndex !== -1) {
            if (!newFolders[folderIndex].notes)
              newFolders[folderIndex].notes = []
            newFolders[folderIndex].notes.push(newNote)
            setFolders(newFolders)
            toast.success("Nota criada!")
          }
        })
        .catch(() => toast.error("Erro ao criar nota"))
    },

    update(id, folderid, title, text) {
      baseFetch(`/notes/${id}`, "PATCH", { folderid, title, text })
        .then((res) => res.json())
        .then((updatedNote) => {
          if (updatedNote.error) return toast.error(updatedNote.error)

          // Refresh folders to get updated data
          folderActions.read()
          toast.success("Nota atualizada!")
        })
        .catch(() => toast.error("Erro ao atualizar nota"))
    },

    delete(id, folderid) {
      if (!confirm("Tem certeza que deseja excluir esta nota?")) return

      baseFetch(`/notes/${id}`, "DELETE")
        .then(() => {
          const newFolders = [...folders]
          const folderIndex = newFolders.findIndex((f) => f.id === folderid)
          if (folderIndex !== -1) {
            newFolders[folderIndex].notes = newFolders[
              folderIndex
            ].notes.filter((n) => n.id !== id)
            setFolders(newFolders)
            toast.success("Nota excluída!")
          }
        })
        .catch(() => toast.error("Erro ao excluir nota"))
    },
  }

  const filteredFolders = useMemo(() => {
    if (!searchTerm) return folders
    const lowerTerm = searchTerm.toLowerCase()
    return folders
      .map((folder) => ({
        ...folder,
        notes: folder.notes?.filter(
          (note) =>
            note.title.toLowerCase().includes(lowerTerm) ||
            note.text.toLowerCase().includes(lowerTerm)
        ),
      }))
      .filter(
        (folder) =>
          folder.name.toLowerCase().includes(lowerTerm) ||
          folder.notes?.length > 0
      )
  }, [folders, searchTerm])

  const currentFolder =
    activeFolder !== undefined ? folders[activeFolder] : null

  const currentFolderFiltered = useMemo(() => {
    if (!currentFolder) return null
    if (!searchTerm) return currentFolder

    const lowerTerm = searchTerm.toLowerCase()
    return {
      ...currentFolder,
      notes: currentFolder.notes?.filter(
        (note) =>
          note.title.toLowerCase().includes(lowerTerm) ||
          note.text.toLowerCase().includes(lowerTerm)
      ),
    }
  }, [currentFolder, searchTerm])

  const handleSignOut = () => {
    signOut()
    route.replace('/')
  }

  useEffect(() => {
    folderActions.read()
  }, [])

  return (
    <div className={style.container}>
      {sidebarOpen && (
        <div
          className={style.overlay}
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside className={`${style.sidebar} ${sidebarOpen ? style.open : ""}`}>
        <div className={style.sidebar_header}>
          <div className={style.logo}>
            Bloco<span>Web</span>
          </div>
          {sidebarOpen && (
            <div onClick={() => setSidebarOpen(false)}>
              <BiXCircle/>
            </div>
          )}
        </div>

        <div className={style.nav_list}>
          <div
            className={`${style.nav_item} ${style.nav_start} ${
              activeFolder === undefined ? style.active : ""
            }`}
            onClick={() => {
              setActiveFolder(undefined)
              setSidebarOpen(false)
            }}
          >
            <BiHomeAlt size={20} />
            <span>Início</span>
          </div>

          <div className={style.folders_section}>
            <div className={style.section_title}>
              <span>Pastas</span>
              <button
                className={style.add_folder_btn}
                onClick={() => {
                  const name = prompt("Nome da nova pasta:")
                  if (name) folderActions.create(name)
                }}
              >
                <BiPlus size={18} />
              </button>
            </div>

            {folders.map((folder, i) => (
              <div
                key={folder.id}
                className={`${style.nav_item} ${
                  activeFolder === i ? style.active : ""
                }`}
                onClick={() => {
                  setActiveFolder(i)
                  setSidebarOpen(false)
                }}
              >
                <BiFolder size={20} />
                <span>{folder.name}</span>
                <button
                  className={style.delete_folder_btn}
                  onClick={(e) => {
                    e.stopPropagation()
                    folderActions.delete(folder.id)
                  }}
                  title="Excluir pasta"
                >
                  <BiTrash size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className={style.user_profile}>
          <div className={style.user_info}>
            <div className={style.avatar}>
              {session?.user?.name?.[0]?.toUpperCase() || "U"}
            </div>
            <span className={style.username}>{session?.user?.name}</span>
          </div>
          <button className={style.logout_btn} onClick={handleSignOut}>
            <BiLogOut size={20} />
          </button>
        </div>
      </aside>

      <main className={style.main_content}>
        <header className={style.top_bar}>
          <button
            className={style.menu_btn}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <BiMenu size={24} />
          </button>

          <div className={style.search_bar}>
            <BiSearch size={20} />
            <input
              type="text"
              placeholder="Pesquisar..."
              className={style.search_input}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        <div className={style.content_area}>
          {currentFolder ? (
            <FolderPres
              folder={currentFolderFiltered}
              createNote={noteActions.create}
              updateNote={noteActions.update}
              deleteNote={noteActions.delete}
              updateFolder={folderActions.update}
              deleteFolder={folderActions.delete}
            />
          ) : (
            <FoldersPres
              folders={filteredFolders}
              onClick={(position) => {
                // Find original index
                const originalIndex = folders.findIndex(
                  (f) => f.id === filteredFolders[position].id
                )
                setActiveFolder(originalIndex)
              }}
            />
          )}
        </div>
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
