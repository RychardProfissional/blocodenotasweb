import prisma from "@/classes/prisma"
import User from "@/classes/user"
import request from "supertest"

const server = "localhost:3000"
const apiRoute = "/api/dashboard/folder/create"
let user

beforeAll(async () => {
  user = await User.create("testUser", "senha")
})

afterAll(async () => {
  await prisma.userToFolder.deleteMany()
  await prisma.user.deleteMany()
  await prisma.folder.deleteMany()
})

describe("Criação de pastas", () => {
  it("Correto", async () => {
    const res = await request(server)
      .post(apiRoute)
      .send({ userId: user.id, name: "testfolder" })

    console.log(res.body.status)

    expect(res.status).toBe(200)
    expect(
      !!(await prisma.userToFolder.findFirst({ where: { userid: user.id } }))
    ).toBe(true)
    expect(!!res.body.folder).toBe(true)
  })

  it("Errado - usuário não existe", async () => {
    const res = await request(server)
      .post(apiRoute)
      .send({ userId: 1, name: "testfolder" })

    expect(res.status).toBe(200)
    expect(
      !!(await prisma.userToFolder.findFirst({
        where: { userid: 1, folderid: res.body.folder.id },
      }))
    ).toBe(false)
    expect(!!res.body.folder).toBe(false)
  })

  it("Errado - usuário não existe", async () => {
    const res = await request(server)
      .post(apiRoute)
      .send({ userId: user.id, name: "testfolder" })

    console.log(res.body)

    expect(res.status).toBe(200)
    expect(
      !!(await prisma.userToFolder.findFirst({
        where: { userid: user.id, folderid: res.body.folder.id },
      }))
    ).toBe(false)
    expect(!!res.body.folder).toBe(false)
  })
})
