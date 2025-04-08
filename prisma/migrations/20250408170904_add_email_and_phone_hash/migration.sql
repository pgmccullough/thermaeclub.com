/*
  Warnings:

  - A unique constraint covering the columns `[emailHash]` on the table `Vip` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phoneHash]` on the table `Vip` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Vip" ADD COLUMN     "emailHash" TEXT,
ADD COLUMN     "phoneHash" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Vip_emailHash_key" ON "Vip"("emailHash");

-- CreateIndex
CREATE UNIQUE INDEX "Vip_phoneHash_key" ON "Vip"("phoneHash");
