import Folder from "@/classes/folder"
import prisma from "@/classes/prisma"
import User from "@/classes/user"
import request from "supertest"

const server = "localhost:3000"
const apiRoute = "/api/dashboard/folder/read"
let user, folder

beforeAll(async () => {
  user = await User.create("testeUser", "senha")
  await Folder.create(user.id, "testeFolder")
  folder = await Folder.create(user.id, "outroTeste")
})

afterAll(async () => {
  await prisma.userToFolder.deleteMany()
  await prisma.user.deleteMany()
  await prisma.folder.deleteMany()
})

describe("Seleção de pastas", () => {
  it("Correto - por usuário", async () => {
    const res = await request(server).post(apiRoute).send({ userId: user.id })

    expect(res.status).toBe(200)
    expect(res.body.result[0].name).toBe("testeFolder")
  })

  it("Correto - por id", async () => {
    const res = await request(server).post(apiRoute).send({ id: folder.id })

    expect(res.status).toBe(200)
    expect(res.body.result.name).toBe("outroTeste")
  })

  it("Errado - sem passar valores", async () => {
    const res = await request(server).post(apiRoute).send({})

    expect(res.status).toBe(200)
    expect(res.body.result).toBe(null)
  })
})
