/*
  Warnings:

  - You are about to drop the column `favouritesArtistId` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `favouritesArtistId` on the `Artist` table. All the data in the column will be lost.
  - You are about to drop the column `albumId` on the `Favourites` table. All the data in the column will be lost.
  - You are about to drop the column `artistId` on the `Favourites` table. All the data in the column will be lost.
  - You are about to drop the column `trackId` on the `Favourites` table. All the data in the column will be lost.
  - You are about to drop the column `favouritesArtistId` on the `Track` table. All the data in the column will be lost.
  - The required column `id` was added to the `Favourites` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Album" DROP CONSTRAINT "Album_favouritesArtistId_fkey";

-- DropForeignKey
ALTER TABLE "Artist" DROP CONSTRAINT "Artist_favouritesArtistId_fkey";

-- DropForeignKey
ALTER TABLE "Track" DROP CONSTRAINT "Track_favouritesArtistId_fkey";

-- DropIndex
DROP INDEX "Favourites_artistId_key";

-- AlterTable
ALTER TABLE "Album" DROP COLUMN "favouritesArtistId",
ADD COLUMN     "favouriteId" TEXT;

-- AlterTable
ALTER TABLE "Artist" DROP COLUMN "favouritesArtistId",
ADD COLUMN     "favouriteId" TEXT;

-- AlterTable
ALTER TABLE "Favourites" DROP COLUMN "albumId",
DROP COLUMN "artistId",
DROP COLUMN "trackId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Favourites_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Track" DROP COLUMN "favouritesArtistId",
ADD COLUMN     "favouriteId" TEXT;

-- AddForeignKey
ALTER TABLE "Artist" ADD CONSTRAINT "Artist_favouriteId_fkey" FOREIGN KEY ("favouriteId") REFERENCES "Favourites"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_favouriteId_fkey" FOREIGN KEY ("favouriteId") REFERENCES "Favourites"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_favouriteId_fkey" FOREIGN KEY ("favouriteId") REFERENCES "Favourites"("id") ON DELETE SET NULL ON UPDATE CASCADE;
