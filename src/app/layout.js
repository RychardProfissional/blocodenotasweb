// import "@/background"
import "./globals.css"
import { Inter } from "next/font/google"
import StyledComponentsRegistry from "./lib/registry"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Bloco de Notas Web",
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  )
}
