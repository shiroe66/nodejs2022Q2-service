import { forwardRef, Module } from '@nestjs/common';
import { AlbumModule } from 'src/album/album.module';
import { ArtistModule } from 'src/artist/artist.module';
import { FavouritesModule } from 'src/favourites/favourites.module';
import { InMemoryDB } from 'src/helpers/InMemoryDB';
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
  providers: [TrackService, InMemoryDB],
})
export class TrackModule {}
