'use client'

import styles from './page.module.css'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  return (
    <main className={styles.main} onClick={() => router.push('/login')}>
      teste
    </main>
  )
}
