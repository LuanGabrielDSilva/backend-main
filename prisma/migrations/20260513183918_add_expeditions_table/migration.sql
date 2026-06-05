-- CreateTable
CREATE TABLE "Expedition" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rewardXp" INTEGER NOT NULL DEFAULT 0,
    "rewardCoins" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Expedition_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Expedition" ADD CONSTRAINT "Expedition_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
