'use client'

import { parseCookies, destroyCookie} from 'nookies'
import styles from './page.module.css'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const cookies = parseCookies()

  console.log(cookies)

  return (
    <main className={styles.main} onClick={() => router.push('/login')}>
      teste
    </main>
  )
}
