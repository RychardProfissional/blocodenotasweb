import prisma from "./prisma"
import bcrypt from "bcryptjs"

// este objeto é responsavel pelo gerencialmento da tabela users

export const User = {
  async create(name, password, email = "") {
    try {
      const hashedPassword = await bcrypt.hash(password, 10)
      return await prisma.user.create({
        data: {
          name: name,
          email: email,
          password: hashedPassword,
        },
      })
    } catch (err) {
      console.log(err)
      return null
    }
  },

  async read({ id, name, password }) {
    try {
      if (id) {
        return await prisma.user.findUnique({ where: { id: id } })
      }

      if (name && password) {
        const user = await prisma.user.findUnique({
          where: { name: name },
        })

        if (!user) return null

        const isPasswordValid = await bcrypt.compare(password, user.password)

        return isPasswordValid ? user : null
      }
    } catch (err) {
      return null
    }
    return null
  },

  async update(id, data) {
    try {
      return await prisma.user.update({ where: { id: id }, data: data })
    } catch (error) {
      return null
    }
  },

  async folderIncrement(id, folderId) {
    if (!id || !folderId) return null

    try {
      return prisma.userToFolder.create({
        data: {
          userid: id,
          folderid: folderId,
        },
      })
    } catch (err) {
      console.log(err)
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
