"use client"

import styled from "styled-components"

export function Note({ title, id, children, ...rest }) {
  return (
    <Container {...rest}>
      <Header>
        <Name>{title}</Name>
        <Id>#{id}</Id>
      </Header>
      <Excerpt>{children}</Excerpt>
    </Container>
  )
}

const Container = styled.div`
  width: 230px;
  min-width: 230px;
  overflow: hidden;
  padding: 10px;
  background-color: blue;
  margin: 10px;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.2s;

  &:hover {
    margin: 7px 10px;
  }
`

const Header = styled.div`
  display: flex;
  padding: 0 5px 5px 5px;
  background-color: red;
  border-radius: 3px 3px 0 0;
`

const Name = styled.div`
  flex-grow: 1;
`

const Id = styled.div``

const Excerpt = styled.div`
  text-align: justify;
`

export default Note
