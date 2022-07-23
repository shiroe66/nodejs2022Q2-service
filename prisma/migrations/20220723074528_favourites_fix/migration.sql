-- DropForeignKey
ALTER TABLE "Favourites" DROP CONSTRAINT "Favourites_albumId_fkey";

-- DropForeignKey
ALTER TABLE "Favourites" DROP CONSTRAINT "Favourites_artistId_fkey";

-- DropForeignKey
ALTER TABLE "Favourites" DROP CONSTRAINT "Favourites_trackId_fkey";

-- DropIndex
DROP INDEX "Favourites_albumId_key";

-- DropIndex
DROP INDEX "Favourites_trackId_key";

-- AlterTable
ALTER TABLE "Album" ADD COLUMN     "favouritesArtistId" TEXT;

-- AlterTable
ALTER TABLE "Artist" ADD COLUMN     "favouritesArtistId" TEXT;

-- AlterTable
ALTER TABLE "Favourites" ALTER COLUMN "albumId" DROP NOT NULL,
ALTER COLUMN "trackId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Track" ADD COLUMN     "favouritesArtistId" TEXT;

-- AddForeignKey
ALTER TABLE "Artist" ADD CONSTRAINT "Artist_favouritesArtistId_fkey" FOREIGN KEY ("favouritesArtistId") REFERENCES "Favourites"("artistId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_favouritesArtistId_fkey" FOREIGN KEY ("favouritesArtistId") REFERENCES "Favourites"("artistId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_favouritesArtistId_fkey" FOREIGN KEY ("favouritesArtistId") REFERENCES "Favourites"("artistId") ON DELETE SET NULL ON UPDATE CASCADE;
