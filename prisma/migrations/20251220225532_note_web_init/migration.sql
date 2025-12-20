-- CreateTable
CREATE TABLE "note_web_user" (
    "id" SERIAL NOT NULL,
    "createdAT" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAT" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "note_web_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserToFolder" (
    "userid" INTEGER NOT NULL,
    "folderid" INTEGER NOT NULL,

    CONSTRAINT "UserToFolder_pkey" PRIMARY KEY ("userid","folderid")
);

-- CreateTable
CREATE TABLE "note_web_folder" (
    "id" SERIAL NOT NULL,
    "createdAT" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAT" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "note_web_folder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "note_web_note" (
    "id" SERIAL NOT NULL,
    "createdAT" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAT" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "folderid" INTEGER NOT NULL,

    CONSTRAINT "note_web_note_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "note_web_user_name_key" ON "note_web_user"("name");

-- AddForeignKey
ALTER TABLE "UserToFolder" ADD CONSTRAINT "UserToFolder_folderid_fkey" FOREIGN KEY ("folderid") REFERENCES "note_web_folder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserToFolder" ADD CONSTRAINT "UserToFolder_userid_fkey" FOREIGN KEY ("userid") REFERENCES "note_web_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "note_web_note" ADD CONSTRAINT "note_web_note_folderid_fkey" FOREIGN KEY ("folderid") REFERENCES "note_web_folder"("id") ON DELETE CASCADE ON UPDATE CASCADE;
