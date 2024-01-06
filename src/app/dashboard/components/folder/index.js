"use client"

import styled from "styled-components"

export function Folder({ src, alt, name, children, amount, ...rest }) {
  const child = !!children
  return (
    <Container $child={child}>
      <ContentFolder $child={child} {...rest}>
        <Img $child={child} src={src} alt={alt} />
        <Name $child={child}>{name}</Name>
        <Amount $child={child}>{amount}</Amount>
      </ContentFolder>
      {child && <ContentNotes>{children}</ContentNotes>}
    </Container>
  )
}

const Container = styled.div`
  color: black;
  background-color: gray;
  cursor: pointer;
`
const ContentFolder = styled.div``
const ContentNotes = styled.div``

const Name = styled.div`
  background-color: white;
`

const Amount = styled.div`
  background-color: whitesmoke;
`

const Img = styled.img`
  background-color: seila;
`

export default Folder
