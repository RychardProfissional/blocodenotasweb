import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

process.on("beforeExit", async () => {
  prisma.$disconnect();
});

export default prisma;
