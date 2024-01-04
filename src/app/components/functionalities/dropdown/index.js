"use client";

import { useState } from "react";
import style from "./dropdown.module.css";

export function DropDown({
  children = <div>acrescente algo aqui</div>,
  DropElement = <div>-</div>,
  eventDrop = "onClick",
  className = "",
  classMenu,
}) {
  const [visible, setVisible] = useState(false);

  const events =
    eventDrop === "onFocus"
      ? {
          onFocus: () => setVisible(true),
          onBlur: () => setVisible(false),
        }
      : {
          [eventDrop]: () => {
            setVisible(!visible);
          },
        };

  return (
    <details
      open={visible}
      className={`${className} ${style.drop_down}`.trim()}
    >
      <summary {...events} className={style.btn}>
        {DropElement}
      </summary>
      <div className={style.container_menu}>
        <menu className={`${classMenu} ${style.drop_content}`.trim()}>
          {children.map((e, i) => (
            <li key={`${e}${i}`}>{e}</li>
          ))}
        </menu>
      </div>
    </details>
  );
}

export default DropDown;
