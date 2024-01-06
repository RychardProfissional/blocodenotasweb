import styled from "styled-components"

export function Input({ label, className, inputClassName, labelClassName, ...rest }) {
  return (
    <Container className={className}>
      <InputStyle className={inputClassName} {...rest} />
      <Label className={labelClassName}>{label}</Label>
    </Container>
  )
}

const Container = styled.div`
  color: white;
`
const InputStyle = styled.input`
  color: white;
`
const Label = styled.span``
