// import "@/background"
import "./globals.css"
import { Inter } from "next/font/google"
import style from "./layout.module.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Bloco de Notas Web",
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <div className={style.content}>{children}</div>
      </body>
    </html>
  )
}
