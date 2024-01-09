import prisma from "./prisma"
import User from "./user"

export const Folder = {
  async create(userid, name) {
    // deve conter uma imagens em versões posteriores
    try {
      console.log("------")
      if (
        !(await User.read({ id: userid })) ||
        !!(await Folder.read("perUser", userid)?.filter(
          (folder) => folder.name === name
        ))
      )
        return false
      const newFolder = await prisma.folder.create({ data: { name: name } })
      console.log(newFolder)
      User.folderIncrement(userid, newFolder.id)

      return newFolder
    } catch (err) {
      console.log(err.menssage)
      return null
    }
  },

  async read(type, where) {
    try {
      switch (type) {
        case "perUser":
          if (!isNaN(where)) {
            return (
              await prisma.user.findFirst({
                where: { id: where },
                select: {
                  folders: {
                    select: {
                      folder: {
                        select: {
                          name: true,
                          id: true,
                        },
                      },
                    },
                  },
                },
              })
            )?.folders.map((userToFolder) => userToFolder.folder)
          }
          break
        case "perId":
          if (!isNaN(where)) {
            return await prisma.folder.findFirst({ where: { id: where } })
          }
          break
      }
    } catch (err) {
      console.log(err.menssage)
      return null
    }
    return null
  },

  async update(userid, data) {
    try {
      return await prisma.folder.update({ where: { userid }, data: data })
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

export default Folder
