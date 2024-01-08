import prisma from "@/classes/prisma"
import request from "supertest"

const server = process.env.NEXT_PUBLIC_VERCEL_URL
const apiRoute = "/api/auth/register"

beforeAll(async () => await prisma.user.deleteMany())
afterAll(async () => await prisma.user.deleteMany())

describe("Registro de usuário", () => {
  it("Correto - sem email", async () => {
    const res = await request(server)
      .post(apiRoute)
      .send({ name: "testeName1", password: "senha" })

    expect(res.status).toBe(200)
    expect(
      !!(await prisma.user.findFirst({ where: { name: "testeName1" } }))
    ).toBe(true)
    expect(res.body.auth).toBe(true)
  })

  it("Correto - com email", async () => {
    const res = await request(server).post(apiRoute).send({
      name: "testeName2",
      password: "senha",
      email: "seila1@gmail.com",
    })

    expect(res.status).toBe(200)
    expect(
      !!(await prisma.user.findFirst({ where: { name: "testeName2" } }))
    ).toBe(true)
    expect(res.body.auth).toBe(true)
  })

  it("Errado - nome repetido", async () => {
    const res = await request(server).post(apiRoute).send({
      name: "testeName2",
      password: "senha",
    })

    expect(res.status).toBe(200)
    expect(
      !!(await prisma.user.findFirst({ where: { name: "testeName2" } }))
    ).toBe(true)
    expect(res.body.auth).toBe(false)
  })

  it("Errado - sem senha", async () => {
    const res = await request(server).post(apiRoute).send({
      name: "testeName3",
    })
    expect(res.status).toBe(200)
    expect(res.body.auth).toBe(false)
  })

  it("Errado - sem nome", async () => {
    const res = await request(server).post(apiRoute).send({
      password: "senha",
      email: "seila2@gmail.com",
    })
    expect(res.status).toBe(200)
    expect(res.body.auth).toBe(false)
  })
})
