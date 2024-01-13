import styled from "styled-components"

export function Input({
  label,
  className,
  inputClassName,
  labelClassName,
  ...rest
}) {
  return (
    <Container className={className}>
      <InputStyle className={inputClassName} {...rest} />
      <Label className={labelClassName}>{label}</Label>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  background-color: red;
  z-index: 1;
`
const InputStyle = styled.input`
  width: 100%;
  height: 100%;
  opacity: 90%;
`
const Label = styled.span`
  position: absolute;
  pointer-events: none;
  left: 4%;
  top: 15%;
  opacity: 70%;
`

export default Input
