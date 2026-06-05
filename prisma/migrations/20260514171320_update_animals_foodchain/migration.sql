-- AlterTable
ALTER TABLE "animals" ADD COLUMN     "defense" TEXT,
ADD COLUMN     "locomotion" TEXT,
ADD COLUMN     "weight" TEXT;

-- CreateTable
CREATE TABLE "food_chain" (
    "id" TEXT NOT NULL,
    "predatorId" TEXT NOT NULL,
    "preyId" TEXT NOT NULL,

    CONSTRAINT "food_chain_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "food_chain" ADD CONSTRAINT "food_chain_predatorId_fkey" FOREIGN KEY ("predatorId") REFERENCES "animals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "food_chain" ADD CONSTRAINT "food_chain_preyId_fkey" FOREIGN KEY ("preyId") REFERENCES "animals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
