import styled from "styled-components"
import { Input } from "@/app/components/style/input"
import DropDown from "@/app/components/functionalities/dropdown"

export function Search({ listItens }) {
  return (
    <DropDown
      eventDrop="onFocus"
      DropElement={<Input type="text" label="pesquisar" />}
    >
      <div>itens</div>

      {/* os itens devem ser referentes a barra de pesquisa. logica com baixa prioridade*/}
    </DropDown>
  )
}
