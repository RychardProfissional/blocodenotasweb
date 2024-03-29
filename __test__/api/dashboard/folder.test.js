import Folder from "@/classes/folder"
import prisma from "@/classes/prisma"
import User from "@/classes/user"
import request from "supertest"

const server = process.env.NEXT_PUBLIC_VERCEL_URL
const apiRoute = "/api/dashboard/folder/"

let user, folder

beforeAll(async () => {
  user = await User.create("nome", "senha")
  folder = await Folder.create({ name: "FolderName", userid: user.id })
})

afterAll(async () => {
  await prisma.userToFolder.deleteMany()
  await prisma.folder.deleteMany()
  await prisma.user.deleteMany()
})

describe("Criacao de pastas", () => {
  it("Correto", async () => {
    const res = await request(server)
      .post(`${apiRoute}CREATE`)
      .send({ name: "Folder", userid: user.id })

    expect(res.status).toBe(200)
    expect(await res.body.result.name).toBe("teste")
  })
})

describe("Leitura de pastas", () => {
  it("Correto - por id de usuário", async () => {
    const res = await request(server)
      .post(`${apiRoute}READ`)
      .send({ userid: user.id })

    expect(res.status).toBe(200)
    expect(res.body.result[0].name).toBe("FolderName")
  })

  it("Correto - por nome da pasta", async () => {
    const res = await request(server)
      .post(`${apiRoute}READ`)
      .send({ name: "Folder" })

    expect(res.status).toBe(200)
    expect(res.body.result[0].name).toBe("FolderName")
    expect(res.body.result[1].name).toBe("Folder")
  })

  it("Correto - por id da pasta", async () => {
    const res = await request(server)
      .post(`${apiRoute}READ`)
      .send({ id: folder.id })

    expect(res.status).toBe(200)
    expect(res.body.result.name).toBe("FolderName")
  })
})

describe("Atualizacao de pastas", () => {
  it("Correto", async () => {
    const res = await request(server)
      .post(`${apiRoute}UPDATE`)
      .send({ id: folder.id, name: "New Name Folder" })

    expect(res.status).toBe(200)
    expect(res.body.result.name).toBe("New Name Folder")
  })
})

describe("Deletando pastas", () => {
  it("Correto", async () => {
    const res = await request(server)
      .post(`${apiRoute}DELETE`)
      .send({ id: folder.id })

    expect(res.status).toBe(200)
    expect(res.body.result.name).toBe("folderName")
    expect(await Folder.READ("perId", folder.id)).toBe(null)
    expect(
      await prisma.userToFolder.findFirst({ where: { id: folder.id } })
    ).toBe(null)
  })
})
