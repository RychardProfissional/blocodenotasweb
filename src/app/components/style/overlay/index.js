"use client"

import { createPortal } from "react-dom"
import styled from "styled-components"

export default function OverLay({ children, ...rest }) {
  return createPortal(
    <OverLayStyle {...rest}>{children}</OverLayStyle>,
    document.body
  )
}

const OverLayStyle = styled.div`
  top: 0;
  left: 0;
  position: absolute;
  height: 100vh;
  width: 100vw;
  z-index: 99;
`
