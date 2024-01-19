"use client"

import { useState } from "react"
import OverLay from "@/app/components/style/overlay"
import styled from "styled-components"
import css from "styled-jsx/css"

export default function Modal({
  btnClass = "", // Estilo para o botão que abre o model
  value = "abrir modal", // valor que vai ficar dentro do botão que abre o model
  className = "",
  headerContent = [], // elementos que ficarão no reader
  exitModal = () => true, // função que executada antes de fechar o model, se ela retornar  valor falsy não fechara o modal
  children,
  ...rest
}) {
  const [active, setActive] = useState(false)
  const exit = () => setActive(exitModal())
  const handleClickBtn = () => setActive(true)

  return (
    <>
      <Btn className={btnClass} onClick={handleClickBtn}>
        {value}
      </Btn>
      {active && (
        <OverLayStyle {...rest}>
          <Content className={className} onClick={(e) => e.stopPropagation()}>
            <Header $size={headerContent.length}>
              <ContentOptions>
                {Array.isArray(headerContent) &&
                  headerContent.map((e, i) => (
                    <ContentOption key={`${e}${i}`}>
                      <Option>{e}</Option>
                    </ContentOption>
                  ))}
              </ContentOptions>
              <Exit onClick={exit}>×</Exit>
            </Header>
            <Children>{children}</Children>
          </Content>
        </OverLayStyle>
      )}
    </>
  )
}

const OverLayStyle = styled(OverLay)`
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 0;
  left: 0;

  height: 100vh;
  width: 100vw;

  background-color: rgb(var(--color-strong-1), 0.3);
  backdrop-filter: blur(0.9px);
  transition: 0.3s;
  z-index: 101;
`

const Btn = styled.button`
  color: rgb(var(--color-white-1));
  border-radius: 5px;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgb(var(--color-1));
  color: rgb(var(--color-white-2));
  min-height: 300px;
  min-width: 500px;
  border-radius: 5px;
`

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px 5px 0 0;
  ${(props) =>
    props.$size &&
    css`
      background-color: rgb(var(--color-strong-1));
    `}
`

const ContentOptions = styled.div`
  display: flex;
`

const ContentOption = styled.div`
  padding: 1px 5px;
  margin: 5px 0px;

  &:not(:fist-child) {
    border-left: 1px solid rgb(var(--color-secondary-2));
  }

  &:not(:last-child) {
    border-right: 1px solid rgb(var(--color-secondary-4));
  }
`

const Option = styled.div`
  padding: 5px;
  cursor: pointer;
  font-size: 1.2em;
  /* tamnho fixo ou variado? */
  border-radius: 2px;
  transition: 0.7s;
  color: rgb(var(--color-white-3));

  &:hover {
    color: rgb(var(--color-white-1));

    text-shadow: 2px 2px 10px rgb(var(--color-black-1));
  }
`

const Exit = styled(Option).attrs({ as: "button" })`
  padding: 0;
  margin-right: 10px;
  vertical-align: middle;
  font-size: 1.5em;
`

const Children = styled.div`
  display: flex;
  flex-grow: 1;
  padding: 5px;
`
