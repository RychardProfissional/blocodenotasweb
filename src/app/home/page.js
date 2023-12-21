'use client'

import styles from './home.module.css'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  {/*O que deve ter nesta homepage?*/}

  return (
    <div className={styles.main}>
      <header>
      </header>
      <main>
        
      </main>
      <footer>

      </footer>
    </div>
  )
}
