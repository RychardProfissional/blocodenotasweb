'use client'
import { destroyCookie, parseCookies } from 'nookies'

export default function Page({ params }) {
  const cookies = parseCookies()
  console.log(cookies)
  for (const val in cookies)
  {
    destroyCookie(null, val)
  }
  return <div>bem vindo: {params.name}</div>
}