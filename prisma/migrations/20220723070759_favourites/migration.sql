-- CreateTable
CREATE TABLE "Favourites" (
    "artistId" TEXT NOT NULL,
    "albumId" TEXT NOT NULL,
    "trackId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Favourites_artistId_key" ON "Favourites"("artistId");

-- CreateIndex
CREATE UNIQUE INDEX "Favourites_albumId_key" ON "Favourites"("albumId");

-- CreateIndex
CREATE UNIQUE INDEX "Favourites_trackId_key" ON "Favourites"("trackId");

-- AddForeignKey
ALTER TABLE "Favourites" ADD CONSTRAINT "Favourites_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favourites" ADD CONSTRAINT "Favourites_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favourites" ADD CONSTRAINT "Favourites_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
