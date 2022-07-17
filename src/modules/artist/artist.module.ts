import { forwardRef, Module } from '@nestjs/common';
import { AlbumModule } from '../album/album.module';
import { FavouritesModule } from '../favourites/favourites.module';
import { InMemoryDB } from '../../helpers/InMemoryDB';
import { TrackModule } from '../track/track.module';
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
