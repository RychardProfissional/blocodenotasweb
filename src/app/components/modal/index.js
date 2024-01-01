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
          <header>
            <div className={style.content_options}>
              {Array.isArray(headerContent) &&
                headerContent.map((e, i) => (
                  <div key={`${e}${i}`} className={style.option}>
                    {e}
                  </div>
                ))}
            </div>
            <button className={style.exit} onClick={() => exit()}>
              ×
            </button>
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
