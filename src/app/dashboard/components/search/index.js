import { Input } from "@/app/components/style/input"
import DropDown from "@/app/components/functionalities/dropdown"

export function Search({ listItens, label, ...rest }) {
  return (
    <DropDown
      eventDrop="onFocus"
      DropElement={
        <Input
          type="text"
          label={label}
          {...rest}
          style={{ padding: "10px 10px" }}
          labelClassName={{ top: "1000%" }}
        />
      }
    >
      <div>itens</div>

      {/* os itens devem ser referentes a barra de pesquisa. logica com baixa prioridade*/}
    </DropDown>
  )
}
