import prisma from "@/classes/prisma"
import Token from "@/classes/token"
import User from "@/classes/user"
import { decode, sign } from "jsonwebtoken"
import request from "supertest"

const server = process.env.NEXT_PUBLIC_VERCEL_URL
const secretKey = process.env.KEY_TOKEN
const apiRoute = "/api/auth/check"

let token, revokedToken, invalidToken, UserInvalidToken

beforeAll(async () => {
  token = sign({ name: "testeUser", password: "senha" }, secretKey, {expiresIn: 50000})
  revokedToken = sign({ name: "testeUser2", password: "senha" }, secretKey, {expiresIn: 50000})
  UserInvalidToken = sign({ name: "testeUser3", password: "senha" }, secretKey, {expiresIn: 50000})
  invalidToken = "open Sesame"

  User.create("testeUser", "senha")
  User.create("testeUser2", "senha")

  await prisma.revokedToken.create({
    data: {
      token: revokedToken,
      revokedAT: 1234,
    },
  })
})

afterAll(async () => {
  await prisma.user.deleteMany()
  await prisma.revokedToken.deleteMany()
})

describe("Check de usuário", () => {
  it("Correto", async () => {
    const res = await request(server).post(apiRoute).send({ token: token })
    
    expect(res.status).toBe(200)
    expect(res.body.auth).toBe(true)
  })

  it("Errado - token revogado", async () => {
    const res = await request(server)
      .post(apiRoute)
      .send({ token: revokedToken })

    expect(prisma.revokedToken.findFirst({ where: { token: revokedToken } }))
    expect(res.status).toBe(200)
    expect(res.body.auth).toBe(false)
  })

  it("Errado - token com usuário inexistente", async () => {
    const res = await request(server)
      .post(apiRoute)
      .send({ token: UserInvalidToken })

    expect(res.status).toBe(200)
    expect(res.body.auth).toBe(false)
  })

  it("Errado - token invalido", async () => {
    const res = await request(server)
      .post(apiRoute)
      .send({ token: invalidToken })

    expect(res.status).toBe(200)
    expect(res.body.auth).toBe(false)
  })
})
