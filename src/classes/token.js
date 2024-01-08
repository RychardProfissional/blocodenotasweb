import jwt from "jsonwebtoken"
import prisma from "./prisma"
import { cookies } from "next/headers"

// este objeto é responsavel pelo gerenciamento dos tokens

const tokenLifeTime = parseInt(process.env.TOKEN_LIFETIME)
const secreteKey = process.env.KEY_TOKEN

export const Token = (() => {
  async function revokeAux(token, fist = true) {
    const data = {
      token: token,
      revokedAT: jwt.decode(token, { complete: true }).payload.exp,
    }
    try {
      await prisma.revokedToken.create({
        data: data,
      })
    } catch (err) {
      console.log(err.message)

      if (!prisma.revokedToken.findFirst({ where: data }))
        setTimeout(() => revokeAux(token, false), 10000)
    } finally {
      if (fist) {
        cookies().delete("TOKEN")
        return true
      }
    }
  }
  return {
    async create(name, password) {
      if (!name || !password) return false
      const token = jwt.sign({ nome: name, password: password }, secreteKey, {
        expiresIn: tokenLifeTime,
      })
      cookies().set("TOKEN", token, {
        maxAge: tokenLifeTime,
        path: "/",
      })
      return token
    },

    async revoke(token) {
      if (!token) return false
      if (!this.verify(token)) return false
      return await revokeAux(token)
    },

    async verify(token) {
      if (!token) return false
      try {
        if (
          !(await prisma.revokedToken.findFirst({ where: { token: token } }))
        ) {
          return jwt.verify(token, secreteKey)
        }
      } catch (err) {
        return false
      }
      return false
    },
  }
})()

export default Token
