"use client"

import { useState } from "react"
import styled from "styled-components"
import OverLay from "@/app/components/style/overlay"

export function DropDown({ children, value, className, preExit = () => {} }) {
  const [visible, setVisible] = useState(false)

  const handleClickBtn = (e) => {
    e.preventDefault()
    e.stopPropagation()
    visible && preExit()
    setVisible(!visible)
  }

  const exit = () => {
    preExit()
    setVisible(false)
  }

  return (
    <div className={className}>
      <Details open={visible}>
        <Btn onClick={handleClickBtn}>{value}</Btn>

        <DropDownContent>
          {Array.isArray(children)
            ? children.map((e, i) => <li key={`${e}${i}`}>{e}</li>)
            : children}
        </DropDownContent>
      </Details>
      {visible && <OverLay onClick={exit} />}
    </div>
  )
}

export default DropDown

const Details = styled.details`
  position: relative;
  z-index: 100;
`

const Btn = styled.summary`
  cursor: pointer;
`

const DropDownContent = styled.menu`
  top: 100%;
  right: 0;
  position: absolute;

  z-index: 100;
`
