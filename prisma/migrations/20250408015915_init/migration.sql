/*
  Warnings:

  - Added the required column `lastName` to the `Vip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vip" ADD COLUMN     "lastName" TEXT NOT NULL;
