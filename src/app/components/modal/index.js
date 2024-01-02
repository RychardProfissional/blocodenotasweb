"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import style from "./modal.module.css";

export function Modal({
  btnClass = "", // Estilo para o botão que abre o model
  value = "abrir modal", // valor que vai ficar dentro do botão que abre o model
  className = "",
  headerContent = [], // elementos que ficarão no reader
  children = <></>, // elemeto ou elementos que ficaram dentro do model
  exitModal = () => {
    true;
  }, // função que executada antes de fechar o model, se ela retornar  valor falsy não fechara o modal
  ...rest
}) {
  const [active, setActive] = useState(false);

  const exit = () => {
    setActive(exitModal());
  };

  const Content = () => {
    return createPortal(
      <div className={style.blur} {...rest}>
        <div className={`${style.content} ${className}`}>
          <header className={`${headerContent.length && style.header}`}>
            <div className={style.content_options}>
              {Array.isArray(headerContent) &&
                headerContent.map((e, i) => (
                  <div className={style.content_option}>
                    <div key={`${e}${i}`} className={style.option}>
                      {e}
                    </div>
                  </div>
                ))}
            </div>
            <button className={style.exit} onClick={() => exit()}>
              ×
            </button>
          </header>
          <div className={style.content_children}>{children}</div>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <>
      <button
        className={`${style.btn} ${btnClass}`}
        onClick={() => setActive(true)}
      >
        {value}
      </button>
      {active && <Content />}
    </>
  );
}

export default Modal;
