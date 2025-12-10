import styled from "styled-components"

export const InputForm = ({
  type = "text",
  error = false,
  className = "",
  label,
  ...rest
}) => {
  if (type === "submit") {
    return <SubmitButton {...rest} type="submit" className={className} />
  }

  return (
    <InputWrapper className={className}>
      <StyledInput {...rest} type={type} placeholder=" " />
      <Label>{label}</Label>
    </InputWrapper>
  )
}

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`

const StyledInput = styled.input`
  width: 100%;
  padding: 1rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: var(--color-text-main);
  font-size: 1rem;
  transition: all 0.2s ease;

  &:focus {
    border-color: var(--color-accent);
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 0 2px var(--color-accent-glow);
  }

  &:not(:placeholder-shown) + label,
  &:focus + label {
    transform: translateY(-2.5rem) scale(0.85);
    color: var(--color-accent);
    left: 0;
  }
`

const Label = styled.label`
  position: absolute;
  left: 1rem;
  top: 1rem;
  color: var(--color-text-muted);
  pointer-events: none;
  transition: all 0.2s ease;
  font-size: 1rem;
`

const SubmitButton = styled.input`
  width: 100%;
  padding: 1rem;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 1rem;

  &:hover {
    background: var(--color-primary-dark);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`

export default InputForm
