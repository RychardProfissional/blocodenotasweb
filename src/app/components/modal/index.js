"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import style from "./modal.module.css";

export function Modal({
  children = <></>,
  value = "abrir modal",
  btnClass = "",
  className = "",
  headerContent = {},
  ...rest
}) {
  const [active, setActive] = useState(false);

  const Content = () => {
    return createPortal(
      <div className={style.blur} {...rest}>
        <div className={`${style.content} ${className}`}>
          <header>
            <div className={style.content_options}>
              {Object.keys(headerContent).map((e, i) => (
                <div
                  key={`${e}${i}`}
                  className={style.option}
                  onClick={() => headerContent[e]()}
                >
                  {e}
                </div>
              ))}
            </div>
            <button onClick={() => setActive(false)}>×</button>
          </header>
          {children}
        </div>
      </div>,
      document.body
    );
  };

  return (
    <>
      <button
        className={`${style.btn_outside} ${btnClass}`}
        onClick={() => setActive(true)}
      >
        {value}
      </button>
      {active && <Content />}
    </>
  );
}

export default Modal;
