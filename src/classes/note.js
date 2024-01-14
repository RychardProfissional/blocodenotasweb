import prisma from "./prisma"

export const Note = {
  async create({ folderid, title, text = "" }) {
    try {
      if (folderid && title) {
        return await prisma.note.create({
          data: {
            folderid,
            title,
            text,
          },
        })
      }
    } catch (err) {
      console.log(err)
      return null
    }
    return null
  },

  async read({ id, folderid }) {
    try {
      if (id) return await prisma.note.findUnique({ where: { id } })

      if (folderid)
        return await prisma.note.findMany({
          where: { folderid },
          select: { id: true, title: true, text: true },
        })
    } catch (err) {
      console.log(err)
      return null
    }
    return null
  },

  async update({ id, folderid, title, text }) {
    try {
      if (id && (folderid || title || text)) {
        return await prisma.note.update({
          where: { id },
          data: { folderid, title, text },
        })
      }
    } catch (err) {
      console.log(err)
      return null
    }
    return null
  },

  async delete({ id }) {
    try {
      return await prisma.note.delete({ where: { id } })
    } catch (err) {
      return null
    }
  },
}

export default Note
