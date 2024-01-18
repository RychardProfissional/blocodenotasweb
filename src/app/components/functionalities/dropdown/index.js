"use client"

import { useEffect, useRef, useState } from "react"
import styled from "styled-components"

export function DropDown({ children = <></>, value = <></>, className = "" }) {
  const [visible, setVisible] = useState(false)
  const detailsRef = useRef(null)

  useEffect(() => {
    const handleClick = (event) => {
      if (detailsRef.current && !detailsRef.current.contains(event.target)) {
        setVisible(false)
      }
    }

    document.addEventListener("click", handleClick)

    return () => document.removeEventListener("click", handleClick)
  }, [visible])

  return (
    <div className={className}>
      <Details ref={detailsRef} open={visible}>
        <Btn
          onClick={(e) => {
            e.preventDefault()
            setVisible((v) => !v)
          }}
        >
          {value}
        </Btn>

        <Drop>
          {Array.isArray(children)
            ? children.map((e, i) => <li key={`${e}${i}`}>{e}</li>)
            : children}
        </Drop>
      </Details>
    </div>
  )
}

export default DropDown

const Details = styled.details`
  position: relative;
`

const Btn = styled.summary`
  cursor: pointer;
`

const Drop = styled.menu`
  top: 100%;
  right: 0;
  position: absolute;

  z-index: 100;
`
