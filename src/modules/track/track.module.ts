import { forwardRef, Module } from '@nestjs/common';
import { AlbumModule } from '../album/album.module';
import { ArtistModule } from '../artist/artist.module';
import { FavouritesModule } from '../favourites/favourites.module';
import { InMemoryDB } from '../../helpers/InMemoryDB';
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
