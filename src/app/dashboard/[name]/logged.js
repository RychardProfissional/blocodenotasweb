"use client";

import Footer from "@/app/components/footer";
import Modal from "@/app/components/modal";

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
          <Modal
            headerContent={{
              teste: () => console.log("teste"),
              seila: () => console.log("seila"),
            }}
            btnClass=""
            value="criar nota"
          >
            <div>apenas um teste sfdasdfasdf</div>
            <div>mais um teste</div>
          </Modal>
        </section>
        <section></section>
      </div>
      {/* <Footer /> */}
    </>
  );
}
