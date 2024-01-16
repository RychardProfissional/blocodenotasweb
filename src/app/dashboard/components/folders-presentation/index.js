import Folder from "../folder"
import Note from "../note"

export const FoldersPres = (folders) => {
  return folders.map((folder) => (
    <Folder
      name={folder.name}
      src={folder.src || undefined}
      alt="logo pasta"
      amount={folder.notes.length}
      onClick={() => console.log("folder")}
    >
      {folder.notes.map((note) => (
        <Note title={note.title} id={note.id}>
          {note.text}
        </Note>
      ))}
    </Folder>
  ))
}

export const FolderPres = (folder) => {
  return (
    <div>
      <div>
        <div>{folder.name}</div>
        <div>{folder.notes.length}</div>
      </div>
      <div>
        {folder.notes.map((note) => (
          <Note title={note.title} id={note.id}>
            {note.text}
          </Note>
        ))}
      </div>
    </div>
  )
}
