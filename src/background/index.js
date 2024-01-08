import prisma from "@/classes/prisma"

const interval = process.env.REVOKED_TOKEN_CLEANUP_INTERVAL

function deleteExpirationTokens() {
  prisma.revokedtoken.deleteMany({
    where: {
      revokedAT: {
        lt: Date.now(),
      },
    },
  })

  setTimeout(() => deleteExpirationTokens(), interval)
}

deleteExpirationTokens()
