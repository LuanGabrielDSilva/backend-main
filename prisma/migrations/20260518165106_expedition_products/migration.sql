-- CreateTable
CREATE TABLE "_ExpeditionToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ExpeditionToProduct_AB_unique" ON "_ExpeditionToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_ExpeditionToProduct_B_index" ON "_ExpeditionToProduct"("B");

-- AddForeignKey
ALTER TABLE "_ExpeditionToProduct" ADD FOREIGN KEY ("A") REFERENCES "Expedition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExpeditionToProduct" ADD FOREIGN KEY ("B") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
