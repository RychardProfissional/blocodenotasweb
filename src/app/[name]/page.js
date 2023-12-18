'use client'

import Router from 'next/router'

export default function Page({ params }) {
  const router = new Router()
  router.push('/home')
  
  return <div></div>
}