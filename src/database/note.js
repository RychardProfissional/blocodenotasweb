import prisma from "./prisma"

export async function createNote(data) {
  try {
    return await prisma.note.create({ data: data })
  } catch (err) {
    return null
  }
}

export async function readNote(where) {
  try {
    return await prisma.note.findUnique({ where: where })
  } catch (err) {
    return false
  }
}

export async function updateNote(where, data) {
  try {
    return await prisma.note.update({ where: where, data: data })
  } catch (err) {
    return null
  }
}

export async function deleteNote(where) {
  try {
    return await prisma.note.delete({ where: where })
  } catch (err) {
    return null
  }
}
