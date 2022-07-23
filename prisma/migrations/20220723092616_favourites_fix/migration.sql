/*
  Warnings:

  - You are about to drop the column `favouriteId` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `favouriteId` on the `Track` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Album" DROP CONSTRAINT "Album_favouriteId_fkey";

-- DropForeignKey
ALTER TABLE "Artist" DROP CONSTRAINT "Artist_favouriteId_fkey";

-- DropForeignKey
ALTER TABLE "Track" DROP CONSTRAINT "Track_favouriteId_fkey";

-- AlterTable
ALTER TABLE "Album" DROP COLUMN "favouriteId";

-- AlterTable
ALTER TABLE "Track" DROP COLUMN "favouriteId";

-- AddForeignKey
ALTER TABLE "Artist" ADD CONSTRAINT "Artist_name_fkey" FOREIGN KEY ("name") REFERENCES "Favourites"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_name_fkey" FOREIGN KEY ("name") REFERENCES "Favourites"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_name_fkey" FOREIGN KEY ("name") REFERENCES "Favourites"("id") ON DELETE SET NULL ON UPDATE CASCADE;
