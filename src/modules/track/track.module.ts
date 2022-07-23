import { forwardRef, Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AlbumModule } from '../album/album.module';
import { ArtistModule } from '../artist/artist.module';
import { FavouritesModule } from '../favourites/favourites.module';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({
  controllers: [TrackController],
  imports: [
    forwardRef(() => ArtistModule),
    forwardRef(() => AlbumModule),
    forwardRef(() => FavouritesModule),
  ],
  exports: [TrackService],
  providers: [TrackService, PrismaService],
})
export class TrackModule {}
