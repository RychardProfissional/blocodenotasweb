import jwt from "jsonwebtoken"
import prisma from "./prisma"
import { cookies } from "next/headers"

// este objeto é responsavel pelo gerenciamento dos tokens

export const Token = (() => {
  const revokeAux = async function (token, fist = true) {
    if (!this.verify(token)) return false

    try {
      await prisma.revokedtoken.create({
        data: {
          token: token,
          revokedAT: jwt.decode(token, { complete: true }).payload.exp,
        },
      })
    } catch (err) {
      setTimeout(() => revokeAux(token, false), 10000)
    } finally {
      if (fist) {
        cookies().delete("TOKEN")
        return true
      }
    }
  }
  return {
    create(name, password) {
      const expiresIn = 3 * 3600
      const token = jwt.sign(
        { nome: name, password: password },
        process.env.KEY_TOKEN,
        {
          expiresIn: expiresIn,
        }
      )
      cookies().set("TOKEN", token, {
        maxAge: expiresIn,
        path: "/",
      })
      return token
    },

    revoke(token) {
      revokeAux.call(this, token)
    },

    async verify(token) {
      try {
        if (!(await prisma.revokedtoken.findUnique({ where: token })))
          return jwt.verify(token, process.env.KEY_TOKEN)
      } catch (err) {
        return false
      }
      return false
    },
  }
})()

export default Token
