import Folder from '@/classes/folder'
import prisma from '@/classes/prisma'
import User from '@/classes/user'
import request from 'supertest'

const server = process.env.NEXT_PUBLIC_VERCEL_URL
const apiRoute = '/api/dashboard/note/create'
const text = 'Somos autores e protagonistas da nossa própria história, cada página é cada dia, os amores são os momentos e oportunidades são os capítulos... Façamos que essa nossa história se torne um bom livro de vida. Que cada momento seja bem aproveitado, é muito mais prazeroso o ato do fazer acontecer do que a frustração do não tentar. Que os olhares sejam lançados e trocados, que sorrisos sejam esbanjados e eternizados em nossas faces.'

let folder 

beforeAll(async () => {
    const user = await User.create('name', 'password')
    folder = await Folder.create('name', user.id)
})

afterAll(async () => {
    await prisma.user.deleteMany()
    await prisma.folder.deleteMany()
})

describe('Criando notas', () => {
    it('Correto', async () => {
        const res = await request(server).post(apiRoute).send({folderid: folder.id, title: 'titulo', text: text})

        expect(res.status).toBe(200)
        expect(res.body.result.title).toBe('titulo')
    })
})