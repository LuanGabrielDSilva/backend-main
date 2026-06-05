/*
  Warnings:

  - You are about to drop the column `baseXP` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `level` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `xp` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "baseXP";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "level",
DROP COLUMN "xp";
