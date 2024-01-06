import prisma from "@/database/prisma"

function deleteExpirationTokens() {
  prisma.revokedtoken.deleteMany({
    where: {
      revokedAT: {
        lt: Date.now(),
      },
    },
  })

  setTimeout(() => deleteExpirationTokens(), 24 * 3600)
}

deleteExpirationTokens()
