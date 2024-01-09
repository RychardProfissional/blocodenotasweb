import prisma from "./prisma"

export const Note = {
  async create(data) {
    try {
      return await prisma.note.create({ data: data })
    } catch (err) {
      return null
    }
  },

  async read(id, folderid) {
    try {
      if (folderid) {
        return await prisma.note.findMany({ where: { folderid: folderid } })
      }
      return await prisma.note.findUnique({ where: { id: id } })
    } catch (err) {
      return false
    }
  },

  async update(data, id, folderid) {
    try {
      if (folderid) {
        return await prisma.note.updateMany({
          where: { folderid: folderid },
          data: data,
        })
      }
      return await prisma.note.update({ where: { id: id }, data: data })
    } catch (err) {
      return null
    }
  },

  async delete(id, folderid) {
    try {
      if (folderid) {
        return await prisma.note.deleteMany({ where: { folderid: folderid } })
      }
      return await prisma.note.delete({ where: { id: id } })
    } catch (err) {
      return null
    }
  },
}
