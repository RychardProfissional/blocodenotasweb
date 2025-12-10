import style from "./note.module.css"

export function Note({ title, id, children, ...rest }) {
  return (
    <div className={style.container} {...rest}>
      <div className={style.header}>
        <div className={style.title}>{title}</div>
        <div className={style.id}>#{id}</div>
      </div>
      <div className={style.excerpt}>
        {typeof children === "string" && children.startsWith("data:image") ? (
          <img
            src={children}
            alt={title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "4px",
            }}
          />
        ) : (
          children
        )}
      </div>
    </div>
  )
}

export default Note
