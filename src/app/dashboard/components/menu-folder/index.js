"use client"

import styled from "styled-components"
import { AiFillFolder, AiFillEdit } from "react-icons/ai"
import { BsFillTrash3Fill } from "react-icons/bs"
import css from "styled-jsx/css"

export function MenuFolder({
  src,
  alt,
  name,
  amount,
  onClick,
  load = false,
  edit = () => {},
  del = () => {},
  ...rest
}) {
  return (
    <Container
      onClick={() => {
        !load && onClick()
      }}
      {...rest}
    >
      <FolderIcon />
      <Name>{name}</Name>
      <Amount>#{amount || 0}</Amount>

      <HoverAnimatin className="animation">
        <Edit
          onClick={(e) => {
            e.stopPropagation()
          }}
        />
        <Trash
          onClick={(e) => {
            e.stopPropagation()
          }}
        />
      </HoverAnimatin>
    </Container>
  )
}

const Container = styled.div`
  position: relative;

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
  overflow: hidden;

  &:hover {
    background-color: rgb(var(--color-black-2));

    & .animation {
      transform: translateX(-100%);
    }
  }
`
const FolderIcon = styled(AiFillFolder)`
  width: 30px;
  height: 30px;
  padding: 5px;
`

const HoverAnimatin = styled.div`
  position: absolute;
  top: 0;
  left: 100%;
  background-image: linear-gradient(to left, black, transparent);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 35%;
  transition: 0.3s ease-out;
`

const baseIcon = css`
  flex-grow: 1;
  height: 100%;
  padding: 13px 0;
  transition: 0.5s;
  color: rgb(var(--color-white-3));
`

const Trash = styled(BsFillTrash3Fill)`
  ${baseIcon}
  &:hover {
    color: rgb(var(--color-secondary-3), 0.9);
  }
`

const Edit = styled(AiFillEdit)`
  ${baseIcon}
  &:hover {
    color: rgb(var(--color-weak-1), 0.7);
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

export default MenuFolder
