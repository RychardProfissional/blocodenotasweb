import prisma from "./prisma"
import User from "./user"

export const Folder = {
  async create({ name, userid }) {
    // deve conter uma imagens em versões posteriores
    try {
      if (
        !User.read(userid) ||
        !(await this.read("perUser", userid))?.filter(
          (folder) => folder.name === name
        )
      )
        return null

      const newFolder = await prisma.folder.create({ data: { name } })

      await User.folderIncrement(userid, newFolder.id)

      return newFolder
    } catch (err) {
      console.log(err)
      return null
    }
  },

  async read({ id, userid, name }) {
    try {
      if (id) {
        return await prisma.folder.findFirst({ where: { id } })
      }

      if (userid) {
        return (
          await prisma.userToFolder.findMany({
            where: { userid },
            include: {
              folder: {
                select: {
                  id: true,
                  name: true,
                  notes: {
                    select: {
                      id: true,
                      title: true,
                      text: true,
                    },
                  },
                },
              },
            },
          })
        )?.map(({ folder }) => ({
          ...folder,
          notes: folder.notes.map((note) => ({
            id: note.id,
            title: note.title,
            text: note.text,
          })),
        }))
      }

      if (name) {
        return await prisma.folder.findMany({
          where: {
            name: {
              startsWith: name,
            },
          },
        })
      }
    } catch (err) {
      console.log(err)
      return null
    }
    return null
  },

  async update({ id, name }) {
    try {
      if (name)
        return await prisma.folder.update({
          where: { id },
          data: { name },
        })
    } catch (err) {
      console.log(err)
      return null
    }
    return null
  },

  async delete({ id }) {
    try {
      return await prisma.folder.delete({
        where: { id },
      })
    } catch (err) {
      console.log(err)
      return null
    }
  },
}

export default Folder
