/*
  Warnings:

  - You are about to drop the column `created_at` on the `Expedition` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Expedition` table. All the data in the column will be lost.
  - Added the required column `title` to the `Expedition` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Expedition" DROP COLUMN "created_at",
DROP COLUMN "name",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT E'completed',
ADD COLUMN     "title" TEXT NOT NULL;
