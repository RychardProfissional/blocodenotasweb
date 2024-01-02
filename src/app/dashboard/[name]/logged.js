"use client";

import Footer from "@/app/components/footer";
import Modal from "@/app/components/modal";
import { MdEdit } from "react-icons/md";

function createNote() {
  console.log("criando nota");
  var frame = <div>teste de criação de frame</div>;

  document.body.appendChild(frame);
}

export default function Logged() {
  return (
    <>
      <header></header>
      <div>
        <section>
          <Modal headerContent={[<div>salvar</div>, <MdEdit />, "texto"]}>
            <textarea
              style={{
                color: "white",
                flexGrow: 1,
                backgroundColor: "rgb(var(--color-white-1), 0.1)",
                resize: "none",
              }}
            >
              proporção e tamanho
            </textarea>
          </Modal>
        </section>
        <section></section>
      </div>
      {/* <Footer /> */}
    </>
  );
}
