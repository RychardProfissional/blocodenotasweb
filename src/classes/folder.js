import prisma from "./prisma"
import User from "./user"

export const Folder = {
  async create(name, userId) {
    // deve conter uma imagens em versões posteriores
    try {
      if (!User.read(userId) || !(await this.read("perUser", userId))?.filter(folder => folder.name === name )) return null
      const newFolder = await prisma.folder.create({data: { name: name }})

      await User.folderIncrement(userId, newFolder.id)

      return newFolder 
    } catch (err) {
      console.log(err)
      return null
    }
  },

  async read(type, where) {
    try {
      switch(type){
        case "perUser":
          if (isNaN(where)) return null
          return (await prisma.userToFolder.findMany({
            where: { userid: where },
            include: {
              folder: {
                select: {
                  name: true,
                  id: true,
                }
              }
            }
          }))?.map(userToFolder => userToFolder.folder)
        
        case "perId":
          if (isNaN(where)) return null
          return await prisma.folder.findFirst({
            where: {id: where}
          })
        
        case "perName": 
          if (typeof type !== 'string') return null
          return await prisma.folder.findMany({
            where: {
              name: {
                startsWith: where
              }
            } 
          })

      }
    } catch (err) {
      console.log(err)
      return null
    }
    return null
  },

  async update(id, newName) {
    try {
      return await prisma.folder.update({ where: {id: id}, data: {name: newName} })
    } catch (err) {
      console.log(err)
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