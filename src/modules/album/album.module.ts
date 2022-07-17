import { forwardRef, Module } from '@nestjs/common';
import { ArtistModule } from '../artist/artist.module';
import { FavouritesModule } from '../favourites/favourites.module';
import { InMemoryDB } from '../../helpers/InMemoryDB';
import { TrackModule } from '../track/track.module';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';

@Module({
  controllers: [AlbumController],
  imports: [
    forwardRef(() => ArtistModule),
    forwardRef(() => TrackModule),
    forwardRef(() => FavouritesModule),
  ],
  exports: [AlbumService],
  providers: [AlbumService, InMemoryDB],
})
export class AlbumModule {}
