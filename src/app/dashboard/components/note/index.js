"use client"

import styled from "styled-components"

export function Note({ name, id, children, ...rest }) {
  return (
    <Container {...rest}>
      <Header>
        <Name>{name}</Name>
        <Id>{id}</Id>
      </Header>
      <Excerpt>{children}</Excerpt>
    </Container>
  )
}

const Container = styled.div``
const Header = styled.div``
const Name = styled.div``
const Id = styled.div``
const Excerpt = styled.div``

export default Note
