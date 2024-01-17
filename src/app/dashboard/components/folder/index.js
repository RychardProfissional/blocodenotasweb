"use client"

import { styled, css } from "styled-components"
import { AiFillFolder } from "react-icons/ai"

export function Folder({ src, alt, name, children, amount, ...rest }) {
  const child = !!children
  return (
    <Container $child={child} {...rest}>
      <ContentFolder $child={child}>
        {src ? <Img $child={child} src={src} alt={alt} /> : <DefaultImage />}
        <Name $child={child}>{name}</Name>
        {!child && <Amount>#{amount || 0}</Amount>}
      </ContentFolder>
      {child && <ContentNotes>{children}</ContentNotes>}
    </Container>
  )
}

const Container = styled.div`
  ${(props) => {
    if (!props.$child)
      return css`
        color: rgb(var(--color-white-1));
        background-color: rgb(var(--color-black-1));
        cursor: pointer;
        margin: 5px;
        padding: 10px 0px;
        border-radius: 5px;
        transition: 0.5s;

        &:hover {
          background-color: rgb(var(--color-black-2));
        }
      `
    else return css``
  }}
`

const ContentFolder = styled.div`
  display: flex;
  align-items: center;
`

const ContentNotes = styled.div`
  display: flex;
  height: 210px;
  overflow: auto;
`

const Name = styled.div`
  flex-grow: 1;
`

const Amount = styled.div`
  ${(props) => {
    if (!props.$child) {
      return css`
        color: rgb(var(--color-white-3));
        padding: 0 7px;
      `
    } else return css``
  }}
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
