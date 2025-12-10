import { useState } from "react"
import Folder from "../folder"
import Note from "../note"
import style from "./presentation.module.css"
import {
  BiNote,
  BiPlus,
  BiImage,
  BiText,
  BiX,
  BiPencil,
  BiTrash,
} from "react-icons/bi"

export const FoldersPres = ({ folders, onClick, ...rest }) => {
  if (!folders?.length) {
    return (
      <div className={style.empty_state}>
        <BiNote className={style.empty_icon} />
        <h3>Nenhuma pasta encontrada</h3>
        <p>Crie uma nova pasta para começar a organizar suas notas.</p>
      </div>
    )
  }

  return (
    <div className={style.grid}>
      {folders.map((folder, i) => (
        <Folder
          name={folder.name}
          src={folder.src || undefined}
          alt="logo pasta"
          amount={folder.notes?.length}
          key={folder.id}
          onClick={() => onClick(i)}
          {...rest}
        >
          {folder.notes?.slice(0, 5).map((note, i) => (
            <Note key={note.id} title={note.title} id={i + 1}>
              {note.text}
            </Note>
          ))}
        </Folder>
      ))}
    </div>
  )
}

export const FolderPres = ({
  folder,
  createNote,
  updateNote,
  deleteNote,
  updateFolder,
  deleteFolder,
  ...rest
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [noteType, setNoteType] = useState("text") // text or image
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [fileName, setFileName] = useState("")
  const [editingNote, setEditingNote] = useState(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFileName(file.name)
      const reader = new FileReader()
      reader.onloadend = () => {
        setContent(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const openCreateModal = () => {
    setEditingNote(null)
    setTitle("")
    setContent("")
    setFileName("")
    setNoteType("text")
    setIsModalOpen(true)
  }

  const openEditModal = (note) => {
    setEditingNote(note)
    setTitle(note.title)
    setContent(note.text)
    setFileName("")
    setNoteType(note.text.startsWith("data:image") ? "image" : "text")
    setIsModalOpen(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title || !content) return alert("Preencha todos os campos")

    if (editingNote) {
      updateNote(editingNote.id, folder.id, title, content)
    } else {
      createNote(folder.id, title, content)
    }

    setIsModalOpen(false)
    setEditingNote(null)
    setTitle("")
    setContent("")
    setFileName("")
    setNoteType("text")
  }

  const handleRenameFolder = () => {
    const newName = prompt("Novo nome da pasta:", folder.name)
    if (newName && newName !== folder.name) {
      updateFolder(folder.id, newName)
    }
  }

  return (
    <div className={style.folder_view}>
      <div className={style.header}>
        <div className={style.title_wrapper}>
          <h2 className={style.title}>{folder.name}</h2>
          <div className={style.folder_actions}>
            <button
              onClick={handleRenameFolder}
              className={style.icon_btn}
              title="Renomear Pasta"
            >
              <BiPencil />
            </button>
            <button
              onClick={() => deleteFolder(folder.id)}
              className={`${style.icon_btn} ${style.danger}`}
              title="Excluir Pasta"
            >
              <BiTrash />
            </button>
          </div>
        </div>
        <div className={style.meta}>
          <span className={style.badge}>{folder.notes?.length || 0} notas</span>
          <button className={style.add_note_btn} onClick={openCreateModal}>
            <BiPlus /> Nova Nota
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className={style.modal_overlay}>
          <div className={style.modal}>
            <div className={style.modal_header}>
              <h3>{editingNote ? "Editar Nota" : "Criar Nova Nota"}</h3>
              <button onClick={() => setIsModalOpen(false)}>
                <BiX size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className={style.form}>
              <div className={style.type_selector}>
                <button
                  type="button"
                  className={`${style.type_btn} ${
                    noteType === "text" ? style.active : ""
                  }`}
                  onClick={() => {
                    setNoteType("text")
                    if (!editingNote) {
                      setContent("")
                      setFileName("")
                    }
                  }}
                >
                  <BiText /> Texto
                </button>
                <button
                  type="button"
                  className={`${style.type_btn} ${
                    noteType === "image" ? style.active : ""
                  }`}
                  onClick={() => {
                    setNoteType("image")
                    if (!editingNote) {
                      setContent("")
                    }
                  }}
                >
                  <BiImage /> Imagem
                </button>
              </div>

              <input
                type="text"
                placeholder="Título da nota"
                className={style.input}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              {noteType === "text" ? (
                <textarea
                  placeholder="Escreva sua nota aqui..."
                  className={style.textarea}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              ) : (
                <div className={style.file_input_wrapper}>
                  <input
                    type="file"
                    accept="image/*"
                    id="note-image"
                    onChange={handleFileChange}
                    className={style.file_input}
                  />
                  <label htmlFor="note-image" className={style.file_label}>
                    {fileName ? fileName : "Escolher Nova Imagem"}
                  </label>
                  {content && (
                    <img
                      src={content}
                      alt="Preview"
                      className={style.preview_image}
                    />
                  )}
                </div>
              )}

              <button type="submit" className={style.submit_btn}>
                {editingNote ? "Salvar Alterações" : "Criar Nota"}
              </button>
            </form>
          </div>
        </div>
      )}

      {folder.notes?.length > 0 ? (
        <div className={style.notes_grid}>
          {folder.notes.map((note) => (
            <div key={note.id} className={style.note_wrapper}>
              <Note
                title={note.title}
                id={note.id}
                onClick={() => openEditModal(note)}
              >
                {note.text}
              </Note>
              <button
                className={style.delete_note_btn}
                onClick={(e) => {
                  e.stopPropagation()
                  deleteNote(note.id, folder.id)
                }}
              >
                <BiTrash />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className={style.empty_state}>
          <BiNote className={style.empty_icon} />
          <h3>Esta pasta está vazia</h3>
          <p>Adicione uma nova nota para começar.</p>
        </div>
      )}
    </div>
  )
}
