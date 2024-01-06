import prisma from "./prisma"

const Folder = {
  async create(name) {
    // deve conter uma imagens em versões posteriores
    try {
      return await prisma.folder.create({ data: { name: name } })
    } catch (err) {
      return null
    }
  },

  async read(name, id, userId) {
    try {
      if (!userId) {
        return await prisma.folder.findUnique({
          where: id ? { id: id } : { name: name },
        })
      }
    } catch (err) {
      return false
    }
  },

  async update(where, data) {
    try {
      return await prisma.folder.update({ where: where, data: data })
    } catch (err) {
      return null
    }
  },

  async delete(where) {
    try {
      return await prisma.folder.delete({ where: where })
    } catch (err) {
      return null
    }
  },
}
