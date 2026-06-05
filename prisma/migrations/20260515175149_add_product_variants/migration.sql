/*
  Warnings:

  - You are about to drop the `product_colors` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "product_colors" DROP CONSTRAINT "product_colors_productId_fkey";

-- DropTable
DROP TABLE "product_colors";
