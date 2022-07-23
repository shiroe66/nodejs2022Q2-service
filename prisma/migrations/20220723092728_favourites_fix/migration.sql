-- DropForeignKey
ALTER TABLE "Album" DROP CONSTRAINT "Album_name_fkey";

-- DropForeignKey
ALTER TABLE "Artist" DROP CONSTRAINT "Artist_name_fkey";

-- DropForeignKey
ALTER TABLE "Track" DROP CONSTRAINT "Track_name_fkey";

-- AlterTable
ALTER TABLE "Album" ADD COLUMN     "favouriteId" TEXT;

-- AlterTable
ALTER TABLE "Track" ADD COLUMN     "favouriteId" TEXT;

-- AddForeignKey
ALTER TABLE "Artist" ADD CONSTRAINT "Artist_favouriteId_fkey" FOREIGN KEY ("favouriteId") REFERENCES "Favourites"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_favouriteId_fkey" FOREIGN KEY ("favouriteId") REFERENCES "Favourites"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_favouriteId_fkey" FOREIGN KEY ("favouriteId") REFERENCES "Favourites"("id") ON DELETE SET NULL ON UPDATE CASCADE;
