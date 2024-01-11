import Folder from '@/classes/folder'
import prisma from '@/classes/prisma'
import User from '@/classes/user'
import request from 'supertest'

const server = process.env.NEXT_PUBLIC_VERCEL_URL
const apiRoute = '/api/dashboard/folder/delete'
let user, folder

beforeAll(async () => {
    user = await User.create('name', 'pass')
    folder = await Folder.create('folderName', user.id)
})

afterAll(async () => {
    await prisma.userToFolder.deleteMany()
    await prisma.folder.deleteMany()
    await prisma.user.deleteMany()
})

describe('Deletando pastas', () => {
    it('Correto', async () => {
        const res = await request(server).post(apiRoute).send({folderId: folder.id})

        expect(res.status).toBe(200)
        expect(res.body.result.name).toBe('folderName')
        expect(await Folder.read('perId', folder.id)).toBe(null)
        expect(await prisma.userToFolder.findFirst({where:{folderid: folder.id}})).toBe(null)
    })
})