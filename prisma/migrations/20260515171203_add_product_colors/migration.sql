/*
  Warnings:

  - You are about to drop the `PredatorRelation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PredatorRelation" DROP CONSTRAINT "PredatorRelation_predatorId_fkey";

-- DropForeignKey
ALTER TABLE "PredatorRelation" DROP CONSTRAINT "PredatorRelation_preyId_fkey";

-- DropTable
DROP TABLE "PredatorRelation";

-- CreateTable
CREATE TABLE "predator_relations" (
    "id" TEXT NOT NULL,
    "predatorId" TEXT NOT NULL,
    "preyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "predator_relations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductVariant" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "image" TEXT,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductVariant_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "predator_relations" ADD CONSTRAINT "predator_relations_predatorId_fkey" FOREIGN KEY ("predatorId") REFERENCES "animals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "predator_relations" ADD CONSTRAINT "predator_relations_preyId_fkey" FOREIGN KEY ("preyId") REFERENCES "animals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductVariant" ADD CONSTRAINT "ProductVariant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
