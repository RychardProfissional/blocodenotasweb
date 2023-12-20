import { PrismaClient } from "@prisma/client";

export async function createUser(data){
    const prisma = new PrismaClient()

    try{ return await prisma.user.create({data: data}) }
    catch(e){ console.log(e); return null }
    finally { prisma.$disconnect() }
}

export async function readUser(where){
    const prisma = new PrismaClient()
    
    try{ return await prisma.user.findUnique({where: where})}
    catch(e){ return false }
    finally{ prisma.$disconnect() }
}

export async function updateUser(id, data){
    const prisma = new PrismaClient()

    try{ return await prisma.user.update({where: {id: id}, data: data})}
    catch(e){ return null }
    finally{ prisma.$disconnect()}
}

export async function deleteUser(where){
    const prisma = new PrismaClient()

    try{ return await prisma.user.delete({where: where})}
    catch(e){ return null }
    finally{ prisma.$disconnect() }
}
