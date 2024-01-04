import styled from "styled-components";
import css from "styled-jsx/css";

const textpass = css`
  width: 100%;
  height: 100%;
  padding: 25px 20px 15px 25px;
  opacity: 90%;
`;

const typeInput = {
  submit: styled.input`
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
  `,

  password: styled.input`
    ${textpass}
  `,

  text: styled.input`
    ${textpass}
  `,
};

const Container = styled.div`
  position: relative;

  background-color: #fafafa;

  outline: 2px solid rgba(0, 0, 0, 0.142);
  border-radius: 5px;

  min-width: 400px;
  height: 57px;

  font-weight: bold;
  font-size: 0.8em;
  z-index: 1;

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
`;

const LabelInput = styled.span`
  position: absolute;
  pointer-events: none;
  left: 7px;
  top: 7px;
  opacity: 70%;
`;

export const InputForm = ({
  type = "text",
  error = false,
  className = "",
  label,
  ...rest
}) => {
  const Input = typeInput[type];
  switch (type) {
    case "submit":
      return <Input {...{ ...rest, type: type, className: className }} />;
    case "text":
    case "password":
      return (
        <Container className={className}>
          <Input {...{ ...rest, type: type }} />
          <LabelInput>{label}</LabelInput>
        </Container>
      );
    default:
      return <input {...{ ...rest, type: type }} />;
  }
};

export default InputForm;
