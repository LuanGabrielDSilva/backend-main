/*
  Warnings:

  - You are about to drop the `food_chain` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "food_chain" DROP CONSTRAINT "food_chain_predatorId_fkey";

-- DropForeignKey
ALTER TABLE "food_chain" DROP CONSTRAINT "food_chain_preyId_fkey";

-- DropTable
DROP TABLE "food_chain";

-- CreateTable
CREATE TABLE "PredatorRelation" (
    "id" TEXT NOT NULL,
    "predatorId" TEXT NOT NULL,
    "preyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PredatorRelation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PredatorRelation" ADD CONSTRAINT "PredatorRelation_predatorId_fkey" FOREIGN KEY ("predatorId") REFERENCES "animals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PredatorRelation" ADD CONSTRAINT "PredatorRelation_preyId_fkey" FOREIGN KEY ("preyId") REFERENCES "animals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
