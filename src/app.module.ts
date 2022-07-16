import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { UserModule } from './user/user.module';
import { FavouritesModule } from './favourites/favourites.module';

@Module({
  imports: [ArtistModule, AlbumModule, TrackModule, UserModule, FavouritesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
