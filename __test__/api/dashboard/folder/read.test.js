import Folder from '@/classes/folder'
import prisma from '@/classes/prisma'
import User from '@/classes/user'
import request from 'supertest'

const server = process.env.NEXT_PUBLIC_VERCEL_URL
const apiRoute = '/api/dashboard/folder/read'
let user, folder

beforeAll(async () => {
    user = await User.create('nome', 'senha')
    folder = await Folder.create('FolderName', user.id)
    await Folder.create('Folder', user.id)
})

afterAll(async () => {
    await prisma.userToFolder.deleteMany()
    await prisma.folder.deleteMany()
    await prisma.user.deleteMany()
})

describe('Leitura de pastas', () => {
    it('Correto - por id de usuário', async () => {
        const res = await request(server).post(apiRoute).send({userId: user.id})
        
        expect(res.status).toBe(200)
        expect(res.body.result[0].name).toBe('FolderName')
    })

    it('Correto - por nome da pasta', async () => {
        const res = await request(server).post(apiRoute).send({name: 'Folder'})
        
        expect(res.status).toBe(200)
        expect(res.body.result[0].name).toBe('FolderName')
        expect(res.body.result[1].name).toBe('Folder')
    })

    it('Correto - por id da pasta', async () => {
        const res = await request(server).post(apiRoute).send({folderId: folder.id})

        expect(res.status).toBe(200)
        expect(res.body.result.name).toBe('FolderName')
    })

    it('Errado - sem parametros', async () => {
        const res = await request(server).post(apiRoute).send({})

        expect(res.status).toBe(200)
        expect(res.body.result).toBe(null)
    })
})