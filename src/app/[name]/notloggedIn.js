'use client'

import { parseCookies } from "nookies"

export default function NotLoggedIn(){
    const cookies = parseCookies()
    console.log(cookies)
    return <div>não logado</div>
}
