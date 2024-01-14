import Folder from "@/classes/folder"
import Note from "@/classes/note"
import prisma from "@/classes/prisma"
import User from "@/classes/user"
import request from "supertest"

const server = process.env.NEXT_PUBLIC_VERCEL_URL
const apiRoute = "/api/dashboard/note/"
const text =
  "Somos autores e protagonistas da nossa própria história, cada página é cada dia, os amores são os momentos e oportunidades são os capítulos... Façamos que essa nossa história se torne um bom livro de vida. Que cada momento seja bem aproveitado, é muito mais prazeroso o ato do fazer acontecer do que a frustração do não tentar. Que os olhares sejam lançados e trocados, que sorrisos sejam esbanjados e eternizados em nossas faces."

let folder, note

beforeAll(async () => {
  const user = await User.create("name", "password")
  folder = await Folder.create("name", user.id)
  note = await Note.create(folder.id, "title", "text")
  await Note.create(folder.id, "test", "text")
})

afterAll(async () => {
  await prisma.user.deleteMany()
  await prisma.folder.deleteMany()
})

describe("Criando notas", () => {
  it("Correto", async () => {
    const res = await request(server)
      .post(`${apiRoute}CREATE`)
      .send({ folderid: folder.id, title: "titulo", text: text })

    expect(res.status).toBe(200)
    expect(res.body.result.title).toBe("titulo")
  })
})

describe("Obtendo notas", () => {
  it("Correto - por id", async () => {
    const res = await request(server)
      .post(`${apiRoute}READ`)
      .send({ id: note.id })

    expect(res.status).toBe(200)
    expect(res.body.result.id).toBe(note.id)
  })

  it("Correto - por pasta", async () => {
    const res = await request(server)
      .post(`${apiRoute}READ`)
      .send({ folderid: folder.id })

    expect(res.status).toBe(200)
    expect(res.body.result[0].id).toBe(note.id)
  })
})

describe("Atualizando notas", () => {
  it("Correto", async () => {
    const res = await request(server)
      .post(`${apiRoute}UPDATE`)
      .send({ id: note.id, title: "seila", text: "the text" })

    expect(res.status).toBe(200)
    expect(res.body.result.title).toBe("seila")
  })
})

describe("Deletando nota", () => {
  it("Correto", async () => {
    const res = await request(server)
      .post(`${apiRoute}DELETE`)
      .send({ id: note.id })

    expect(res.status).toBe(200)
    expect(res.body.result.title).toBe("title")
    expect(await prisma.note.findUnique({ where: { id: note.id } })).toEqual(
      null
    )
  })
})
