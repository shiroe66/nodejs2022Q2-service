import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { InMemoryDB } from 'src/InMemoryDB';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, InMemoryDB],
})
export class ArtistModule {}
