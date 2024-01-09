import prisma from "./prisma"

// este objeto é responsavel pelo gerencialmento da tabela users

export const User = {
  async create(name, password, email = "") {
    try {
      return await prisma.user.create({
        data: {
          name: name,
          email: email,
          password: password,
        },
      })
    } catch (error) {
      return null
    }
  },

  async read(where) {
    try {
      return await prisma.user.findUnique({ where: where })
    } catch (err) {
      return null
    }
  },

  async update(id, data) {
    try {
      return await prisma.user.update({ where: { id: id }, data: data })
    } catch (error) {
      return null
    }
  },

  async folderIncrement(userId, folderId) {
    try {
      return await prisma.userToFolder.create({
        data: { userid: userId, folderid: folderId },
      })
    } catch (err) {
      console.log(err.menssage)
      return null
    }
  },

  async delete(id) {
    try {
      return await prisma.user.delete({ where: { id: id } })
    } catch (error) {
      return null
    }
  },
}

export default User
