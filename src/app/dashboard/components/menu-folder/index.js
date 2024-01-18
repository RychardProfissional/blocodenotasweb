"use client"

import styled from "styled-components"
import { AiFillFolder } from "react-icons/ai"
import { BsFillTrash3Fill } from "react-icons/bs"

export function MenuFolder({ src, alt, name, amount, ...rest }) {
  return (
    <Container {...rest}>
      <ContentAnimation>
        <HoverAnimatin className="animation">
          {src ? <Img src={src} alt={alt} /> : <AiFillFolder />}
          <Trash />
        </HoverAnimatin>
      </ContentAnimation>
      <Name>{name}</Name>
      <Amount>#{amount || 0}</Amount>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  color: rgb(var(--color-white-1));
  background-color: rgb(var(--color-black-1));
  cursor: pointer;
  margin: 5px;
  padding: 10px 0px;
  border-radius: 5px;
  transition: 0.5s;
  height: 45px;

  &:hover {
    background-color: rgb(var(--color-black-2));

    & .animation {
      transform: translate(0, -50%);
    }
  }
`

const ContentAnimation = styled.div`
  position: relative;

  height: 25px;
  width: 25px;

  margin: 0 10px;
  overflow: hidden;
`

const HoverAnimatin = styled.div`
  possition: absolute;
  top: 0px;
  left: 0px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  height: 200%;
  width: 100%;
  padding: 5px 0;
  transition: 0.3s;
`

const Trash = styled(BsFillTrash3Fill)`
  transition: 0.5s;
  &:hover {
    color: red;
  }
`

const Name = styled.div`
  flex-grow: 1;
  text-align: left;
`

const Amount = styled.div`
  color: rgb(var(--color-white-3));
  padding: 0 7px;
`

const Img = styled.img`
  background-color: green;
`

export default MenuFolder
