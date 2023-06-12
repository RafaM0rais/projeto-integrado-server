/*
  Warnings:

  - The primary key for the `agenda` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `cliente` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "agenda" DROP CONSTRAINT "agenda_clienteId_fkey";

-- AlterTable
ALTER TABLE "agenda" DROP CONSTRAINT "agenda_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(64),
ALTER COLUMN "clienteId" SET DATA TYPE VARCHAR(64),
ADD CONSTRAINT "agenda_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "cliente" DROP CONSTRAINT "cliente_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(64),
ADD CONSTRAINT "cliente_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "agenda" ADD CONSTRAINT "agenda_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
