import prisma from '@/classes/prisma'
import User from '@/classes/user'
import request from 'supertest'

const server = process.env.NEXT_PUBLIC_VERCEL_URL
const apiRoute = '/api/dashboard/folder/create'

let user

beforeAll(async () => {
    user = await User.create('testeUser', 'senha')
})

afterAll(async () => {
    await prisma.userToFolder.deleteMany()
    await prisma.folder.deleteMany()
    await prisma.user.deleteMany()
})

describe('Criacao de pastas', () => {
    it('Correto', async () => {
        const res = await request(server).post(apiRoute).send({name: 'teste', userId: user.id})
        
        expect(res.status).toBe(200)
        expect(await res.body.result.name).toBe('teste')
    })
})