import DropDown from "@/app/components/dropdown";
import Footer from "@/app/components/footer";
import Modal from "@/app/components/modal";
import { BsPersonCircle } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import style from "./logged.module.css";
import { cookies } from "next/headers";

export async function Logged() {
  return (
    <div className={style.container}>
      <header className={style.header}>
        <div>dashboard</div>
        <DropDown
          className={style.profile}
          DropElement={<BsPersonCircle className={style.profile_icon} />}
          classMenu={style.profile_drop}
        >
          <div>teste</div>
          <div>sair</div>
        </DropDown>
      </header>
      <main className={style.main}>
        <section className={style.menu}>
          <Modal
            headerContent={[<div>salvar</div>]}
            value={<div className={style.create_note}>Criar nota</div>}
          >
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
        <section className={style.content}></section>
      </main>
      <Footer />
    </div>
  );
}
