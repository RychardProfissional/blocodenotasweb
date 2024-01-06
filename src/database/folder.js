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

  async read(where) {
    try {
      return await prisma.folder.findUnique({
        where: where,
      })
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

  async delete(id) {
    try {
      return await prisma.folder.delete({ id: id })
    } catch (err) {
      return null
    }
  },
}
