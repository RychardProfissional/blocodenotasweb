-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_nome_key" ON "users"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
