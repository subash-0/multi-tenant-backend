/*
  Warnings:

  - A unique constraint covering the columns `[id,belongToId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `UpdatePoint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `UpdatePoint` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UpdatePoint" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "name" VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_id_belongToId_key" ON "Product"("id", "belongToId");
