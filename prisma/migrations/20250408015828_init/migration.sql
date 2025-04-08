/*
  Warnings:

  - You are about to drop the `VIP` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "VIP";

-- CreateTable
CREATE TABLE "Vip" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "signedUp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Vip_pkey" PRIMARY KEY ("id")
);
