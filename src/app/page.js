'use client'

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Page() {
  useEffect(() => useRouter().push('/home'), [])
  return <div></div>
}