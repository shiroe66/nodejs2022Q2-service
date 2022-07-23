import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ArtistController],
  exports: [ArtistService],
  providers: [ArtistService, PrismaService],
})
export class ArtistModule {}
