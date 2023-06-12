/*
  Warnings:

  - The primary key for the `agenda` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `cliente` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `id` on the `agenda` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `clienteId` on the `agenda` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `cliente` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "agenda" DROP CONSTRAINT "agenda_clienteId_fkey";

-- AlterTable
ALTER TABLE "agenda" DROP CONSTRAINT "agenda_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "clienteId",
ADD COLUMN     "clienteId" UUID NOT NULL,
ADD CONSTRAINT "agenda_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "cliente" DROP CONSTRAINT "cliente_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "cliente_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "agenda" ADD CONSTRAINT "agenda_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
