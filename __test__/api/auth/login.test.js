import prisma from "@/classes/prisma"
import User from "@/classes/user"
import request from "supertest"

const server = process.env.NEXT_PUBLIC_VERCEL_URL
const apiRoute = "/api/auth/login"

let user

beforeAll(async () => {
  user = await User.create("testeName", "senha")
})

afterAll(async () => {
  await prisma.user.deleteMany()
})

describe("Login de usuário", () => {
  it("Correto", async () => {
    const res = await request(server)
      .post(apiRoute)
      .send({ name: "testeName", password: "senha" })

    expect(res.status).toBe(200)
    expect(res.body.auth).toBe(true)
  })
})
