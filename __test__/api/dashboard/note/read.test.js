import Folder from "@/classes/folder"
import Note from "@/classes/note"
import prisma from "@/classes/prisma"
import User from "@/classes/user"
import request from "supertest"

const server = process.env.NEXT_PUBLIC_VERCEL_URL
const apiRoute = '/api/dashboard/note/read'

let folder, note

beforeAll(async () => {
    const user = await User.create('name', 'password')
    folder = await Folder.create('name', user.id)
    note = await Note.create(folder.id, 'title', 'text')
    await Note.create(folder.id, 'test', 'text')
})

afterAll(async () => {
    await prisma.user.deleteMany()
    await prisma.folder.deleteMany()
})

describe('Obtendo notas', () => {
    it('Correto - por id', async () => {
        const res = await request(server).post(apiRoute).send({id: note.id})

        expect(res.status).toBe(200)
        expect(res.body.result.id).toBe(note.id)
    })

    it('Correto - por pasta', async () => {
        const res = await request(server).post(apiRoute).send({folderid: folder.id})

        expect(res.status).toBe(200)
        expect(res.body.result[0].id).toBe(note.id)
    })
})