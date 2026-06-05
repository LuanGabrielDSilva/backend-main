/*
  Warnings:

  - Added the required column `bairro` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cep` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cidade` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numero` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rua` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "bairro" TEXT NOT NULL,
ADD COLUMN     "cep" TEXT NOT NULL,
ADD COLUMN     "cidade" TEXT NOT NULL,
ADD COLUMN     "complemento" TEXT,
ADD COLUMN     "estado" TEXT NOT NULL,
ADD COLUMN     "numero" TEXT NOT NULL,
ADD COLUMN     "rua" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "bairro" TEXT,
ADD COLUMN     "cep" TEXT,
ADD COLUMN     "cidade" TEXT,
ADD COLUMN     "complemento" TEXT,
ADD COLUMN     "estado" TEXT,
ADD COLUMN     "numero" TEXT,
ADD COLUMN     "rua" TEXT;
