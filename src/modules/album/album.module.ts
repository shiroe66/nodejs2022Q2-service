import { forwardRef, Module } from '@nestjs/common';
import { ArtistModule } from '../artist/artist.module';
import { FavouritesModule } from '../favourites/favourites.module';
import { TrackModule } from '../track/track.module';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [AlbumController],
  imports: [
    forwardRef(() => ArtistModule),
    forwardRef(() => TrackModule),
    forwardRef(() => FavouritesModule),
  ],
  exports: [AlbumService],
  providers: [AlbumService, PrismaService],
})
export class AlbumModule {}
