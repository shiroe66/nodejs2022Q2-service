import { forwardRef, Module } from '@nestjs/common';
import { AlbumModule } from 'src/album/album.module';
import { FavouritesModule } from 'src/favourites/favourites.module';
import { InMemoryDB } from 'src/helpers/InMemoryDB';
import { TrackModule } from 'src/track/track.module';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';

@Module({
  controllers: [ArtistController],
  imports: [
    forwardRef(() => TrackModule),
    forwardRef(() => AlbumModule),
    forwardRef(() => FavouritesModule),
  ],
  exports: [ArtistService],
  providers: [ArtistService, InMemoryDB],
})
export class ArtistModule {}
