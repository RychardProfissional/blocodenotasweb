import Input from "@/app/components/style/input"
import styled from "styled-components"

export const InputForm = ({
  type = "text",
  error = false,
  className = "",
  label,
  ...rest
}) => {
  switch (type) {
    case "submit":
      return <BaseInput {...{ ...rest, type: type, className: className }} />
    case "text":
    case "password":
      return (
        <InputStyle
          label={label}
          {...rest}
          style={{ padding: "25px 20px 15px 25px" }}
        />
      )
    default:
      return <input {...{ ...rest, type: type }} />
  }
}

const InputStyle = styled(Input)`
  background-color: #fafafa;

  outline: 2px solid rgba(0, 0, 0, 0.142);
  border-radius: 5px;

  min-width: 400px;
  height: 57px;

  font-weight: bold;
  font-size: 0.8em;

  &:hover {
    background-color: #efefef;
    outline-color: rgba(0, 0, 0, 0.396);
  }

  &:focus-within {
    background-color: #efefef;
    outline-color: rgba(0, 0, 0, 0.86);
  }

  &:focus-within span,
  & input:valid + span {
    opacity: 100%;
  }
`

const BaseInput = styled.input`
  background-color: #fafafa;

  border-radius: 10px;
  outline: 2px solid transparent;

  padding: 20px 30px;

  font-weight: bold;
  font-size: 1.05em;
  cursor: pointer;

  &:hover {
    background-color: #efefef;
    outline-color: rgba(0, 0, 0, 0.396);
  }
`

export default InputForm
