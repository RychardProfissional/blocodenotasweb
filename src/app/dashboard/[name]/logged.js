import DropDown from "@/app/components/functionalities/dropdown"
import Modal from "@/app/components/functionalities/modal"
import { BsPersonCircle } from "react-icons/bs"
import style from "./logged.module.css"

export async function Logged() {
  return (
    <div className={style.container}>
      <header className={style.header}>
        <div>dashboard</div>
        <DropDown
          DropElement={<BsPersonCircle className={style.profile_icon} />}
          className={style.profile}
          classMenu={style.profile_drop}
        >
          <div className={style.profile_drop_item}>teste</div>
          <div className={style.exit}>sair</div>
        </DropDown>
      </header>
      <main className={style.main}>
        <section className={style.menu}>
          <div>
            <div>
              <div>home</div>
              <input type="text" value="pesquisar" />
            </div>
            <h3>Suas pastas</h3>
            <DropDown DropElement={<div>+</div>}>
              <Modal headerContent={[<div>salvar</div>]} value={<div>Criar nova pasta</div>}>
                {/* ---------- create folder */}
                <textarea className={style.create_nota_textarea} />
              </Modal>
              <Modal
                headerContent={[
                  <div>salvar</div>,
                  <input type="text" style={{ color: "white" }} />,
                ]}
                btnClass={style.create_note}
                value="Criar nova nota"
              >
                {/* --------- create note */}
                <textarea className={style.create_nota_textarea} />
              </Modal>
            </DropDown>
          </div>
          <div>
            {/* repetir até não ter mais pastas */}
            {/* ------------- read folder */}
            <div>
              {/* ao clicar neste elemente deve modificar a section content */}
              <img alt="icone da pasta" />
              <span>nome da pasta</span>
              <div>quantidade de anotações na pasta</div>
            </div>
          </div>
          <div>
            quer ver o codigo deste site? acesse meu <a href="#">github</a>
          </div>
        </section>
        {/* está section vai mudar a depender da pasta selecionada */}
        {/* estrutura base */}
        <section>
          {/* repetir */}
          {/* ---------- read folders */}
          <div>
            <img alt="icone da pasta" />
            <span>nome da pasta</span>
            <div>quantidade de anotações na pasta</div>
          </div>
          <div>
            {/* deve ter wrap, ou display grad */}
            {/* esta div deve se repetir*/}
            {/* --------- read notes */}
            <div>
              <div>
                <span>nome da anotação</span>
                <span>#id da anotação</span>
                <div>trecho da anotação</div>
              </div>
            </div>
          </div>
        </section>

        {/* esse sera o home da pagina */}
        <section className={style.content}>
          {/* esta div deve se repetir até chegar no fundo da tela ou acabar as pastas */}
          {/* ----------- read folders? */}
          <div>
            <div>
              <span>Nome da pasta</span>
              <div>quantidade de anotações</div>
            </div>
            <div>
              {/* esta div deve se repetir ate chegar na lateral direta da tela ou acabar as anotações */}
              {/* ---------------- read notes */}
              <div>
                <span>nome da anotação</span>
                <span>#id da anotação</span>
                <div>trecho da anotação</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

// passo 1 componetizar
// passo 2 criar apis
// passo 3 testar os dois juntos
// passo 4 estilizar
// passo 5 otimizar ------ não é pra fazer isto antes.
