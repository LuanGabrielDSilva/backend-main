/*
  Warnings:

  - You are about to drop the column `resetToken` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `resetTokenExpires` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "resetToken",
DROP COLUMN "resetTokenExpires",
ADD COLUMN     "reset_token" TEXT,
ADD COLUMN     "reset_token_expires" TIMESTAMP(3);
