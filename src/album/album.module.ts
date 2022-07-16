import { forwardRef, Module } from '@nestjs/common';
import { ArtistModule } from 'src/artist/artist.module';
import { FavouritesModule } from 'src/favourites/favourites.module';
import { InMemoryDB } from 'src/helpers/InMemoryDB';
import { TrackModule } from 'src/track/track.module';
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
