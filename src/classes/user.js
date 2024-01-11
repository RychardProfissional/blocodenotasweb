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
    } catch (err) {
      console.log(err)
      return null
    }
  },

  async read({id, name, password}) {
    try {
      if (id){
        return await prisma.user.findUnique({ where: {id: id} })
      }

      if (name && password){
        return await prisma.user.findFirst({ where: {name: name, password: password} })
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

  async folderIncrement(id, folderId){
    if (!id || !folderId) return null

    try {
      return prisma.userToFolder.create({
        data: {
          userid: id,
          folderid: folderId,
        }
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
