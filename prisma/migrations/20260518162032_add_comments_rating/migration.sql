/*
  Warnings:

  - You are about to drop the column `content` on the `comments` table. All the data in the column will be lost.
  - Added the required column `text` to the `comments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_productId_fkey";

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "content",
ADD COLUMN     "rating" INTEGER NOT NULL DEFAULT 5,
ADD COLUMN     "text" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
