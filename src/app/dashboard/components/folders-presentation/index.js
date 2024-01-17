import Folder from "../folder"
import Note from "../note"

export const FoldersPres = ({ folders, ...rest }) => {
  return folders?.map((folder) => (
    <Folder
      name={folder.name}
      src={folder.src || undefined}
      alt="logo pasta"
      amount={folder.notes?.length}
      key={folder.id}
      {...rest}
    >
      {folder.notes?.map((note, i) => (
        <Note key={note.id} title={note.title} id={i + 1}>
          {note.text}
        </Note>
      ))}
    </Folder>
  ))
}

export const FolderPres = ({ folder, ...rest }) => {
  return (
    <div>
      <div>
        <div>{folder.name}</div>
        <div>{folder.notes?.length}</div>
      </div>
      <div>
        {folder.notes?.map((note) => (
          <Note key={note.id} title={note.title} id={note.id}>
            {note.text}
          </Note>
        ))}
      </div>
    </div>
  )
}

export const MenuFolders = ({ folders, onClick, ...rest }) =>
  folders?.map((folder, i) => (
    <Folder
      name={folder.name}
      src={folder.src || undefined}
      alt="logo pasta"
      amount={folder.notes?.length}
      key={`${folder.id}`}
      onClick={() => onClick(folder.id, i)}
      {...rest}
    />
  ))
