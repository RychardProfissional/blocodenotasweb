"use client"

import styled from "styled-components"
import { AiFillFolder } from "react-icons/ai"

export function Folder({ src, alt, name, children, amount, onClick, ...rest }) {
  return (
    <Container {...rest}>
      <ContentFolder onClick={onClick}>
        {src ? <Img src={src} alt={alt} /> : <DefaultImage />}
        <Name>{name}</Name>
      </ContentFolder>
      <ContentNotes>{children}</ContentNotes>
    </Container>
  )
}

const Container = styled.div`
  margin: 5px 0;
  background-color: rgb(127, 127, 127, 0.5);
  border-radius: 5px;
  padding-bottom: 2px;
`

const ContentFolder = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: gray;
  padding: 10px;
  border-radius: 5px 5px 0 0;
`

const ContentNotes = styled.div`
  display: flex;
  height: 210px;
  overflow: auto;
  margin: 10px;

  &::-webkit-scrollbar {
    background-color: rgb(127, 127, 127, 0.5);
    height: 10px;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: red;
    margin: 5px;
    border-radius: 10px;
  }

  &:first-child {
    margin-left: 0 !important;
  }
`

const Name = styled.div`
  flex-grow: 1;
`

const Img = styled.img`
  background-color: green;
`

const DefaultImage = styled(AiFillFolder)`
  padding: 3px;
  margin: 0 10px;
  height: 25px;
  width: 25px;
`

export default Folder
