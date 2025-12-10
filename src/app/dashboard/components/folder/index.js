import { AiFillFolder } from "react-icons/ai"
import style from "./folder.module.css"

export function Folder({ src, alt, name, children, amount, onClick, ...rest }) {
  return (
    <div className={style.container} {...rest}>
      <div className={style.header} onClick={onClick}>
        <div className={style.icon_wrapper}>
          {src ? <img src={src} alt={alt} /> : <AiFillFolder size={24} />}
        </div>
        <div className={style.name}>{name}</div>
        {amount !== undefined && (
          <div className={style.count}>{amount} notas</div>
        )}
      </div>
      <div className={style.notes_container}>{children}</div>
    </div>
  )
}

export default Folder
