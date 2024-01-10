import Folder from "@/classes/folder"
import prisma from "@/classes/prisma"
import User from "@/classes/user"
import request from "supertest"

const server = process.env.NEXT_PUBLIC_VERCEL_URL
const apiRoute = '/api/dashboard/folder/update'

let folder

beforeAll(async () => {
    const user = await User.create('name', 'password')
    folder = await Folder.create('Folder', user.id)
})

afterAll(async () => {
    await prisma.userToFolder.deleteMany()
    await prisma.user.deleteMany()
    await prisma.folder.deleteMany()
})

describe('Atualizacao de pastas', () => {
    it('Correto', async () => {
        const res = await request(server).post(apiRoute).send({folderId: folder.id, newName: 'New Name Folder'})

        expect(res.status).toBe(200)
        expect(res.body.result.name).toBe('New Name Folder')
    })
})