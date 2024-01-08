import prisma from "@/classes/prisma"
import { sign } from "jsonwebtoken"
import request from "supertest"

const server = process.env.NEXT_PUBLIC_VERCEL_URL
const apiRoute = "/api/auth/logoff"

describe("Logoff de usuário", () => {
  it("Correto", async () => {
    const res = await request(server)
      .post(apiRoute)
      .send({
        token: sign({ nome: "teste", password: "password" }, "teste", {
          expiresIn: parseInt(process.env.TOKEN_LIFETIME),
        }),
      })

    expect(res.status).toBe(200)
    expect(res.body.auth).toBe(true)
  })
})
