import Folder from '@/classes/folder'
import prisma from '@/classes/prisma'
import Note from '@/classes/note'
import User from '@/classes/user'
import request from 'supertest'

const server = process.env.NEXT_PUBLIC_VERCEL_URL
const apiRoute = '/api/dashboard/note/delete'

let folder, note

beforeAll(async () => {
    const user = await User.create('name', 'password')
    folder = await Folder.create('name', user.id)
    note = await Note.create(folder.id, 'title', 'text')
})

afterAll(async () => {
    await prisma.user.deleteMany()  
    await prisma.folder.deleteMany()
})

describe('Deletando nota', () => {
    it('Correto', async () => {
        const res = await request(server).post(apiRoute).send({id: note.id})
        
        expect(res.status).toBe(200)
        expect(res.body.result.title).toBe('title')
        expect(await prisma.note.findUnique({where: {id: note.id}})).toEqual(null)
    })
})