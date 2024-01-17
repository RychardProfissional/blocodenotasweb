import styled from "styled-components"
import { BiSearchAlt2 } from "react-icons/bi"
export function Search({ listItens, ...rest }) {
  return (
    <Label htmlFor="seachDashboard" {...rest}>
      <BiSearchAlt2 style={{ marginRight: "5px" }} />
      <Input id="seachDashboard" autoComplete="off" />
    </Label>
  )
}

const Label = styled.label`
  cursor: text;
`

const Input = styled.input`
  color: rgb(var(--color-white-1));
`
