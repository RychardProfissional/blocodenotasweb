import prisma from "./prisma"

export async function createFolder(data) {
  try {
    return await prisma.folder.create({ data: data })
  } catch (err) {
    return null
  }
}

export async function readFolder(where) {
  try {
    return await prisma.folder.findUnique({ where: where })
  } catch (err) {
    return false
  }
}

export async function updateFolder(where, data) {
  try {
    return await prisma.folder.update({ where: where, data: data })
  } catch (err) {
    return null
  }
}

export async function deleteFolder(where) {
  try {
    return await prisma.folder.delete({ where: where })
  } catch (err) {
    return null
  }
}
