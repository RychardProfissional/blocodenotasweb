"use client"

import DropDown from "@/app/components/functionalities/dropdown"
import { useState } from "react"
import { AiOutlineFolderAdd } from "react-icons/ai"
import styled from "styled-components"

export function CreateFolder({ onClick = () => {} }) {
  const [folderName, setFolderName] = useState("")

  const exitDrop = () => setFolderName("")
  const handleChange = ({ target }) => setFolderName(target.value)

  return (
    <DropDown value={<Icon />} preExit={exitDrop}>
      <Container>
        <Input
          value={folderName}
          onChange={handleChange}
          placeholder="nome da pasta"
          maxLength={20}
        />
        <Btn onClick={() => onClick(folderName)}>salvar</Btn>
      </Container>
    </DropDown>
  )
}

const Container = styled.div`
  display: flex;
  background-color: rgb(var(--color-black-3));
  height: 36px;
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid rgb(var(--color-black-1));
  outline: 1px solid rgb(var(--color-black-3));
`

const Input = styled.input`
  color: rgb(var(--color-white-2));
  margin-left: 5px;
`

const Icon = styled(AiOutlineFolderAdd)`
  height: 33px;
  width: 33px;
  padding: 3px;
  transition: 0.5s;

  &:hover {
    color: rgb(var(--color-secondary-5));
  }
`

const Btn = styled.button`
  background-color: rgb(var(--color-2));
  height: 100%;
  padding: 0 10px;
  color: rgb(var(--color-white-2));
  transition: 0.5s;
  border-left: 1px solid rgb(var(--color-black-1));

  &:hover {
    background-color: rgb(var(--color-4));
  }
`
