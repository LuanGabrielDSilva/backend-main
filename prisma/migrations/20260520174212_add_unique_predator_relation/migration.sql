/*
  Warnings:

  - A unique constraint covering the columns `[predatorId,preyId]` on the table `predator_relations` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "predator_relations_predatorId_preyId_key" ON "predator_relations"("predatorId", "preyId");
