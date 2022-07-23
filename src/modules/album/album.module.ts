import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [AlbumController],
  exports: [AlbumService],
  providers: [AlbumService, PrismaService],
})
export class AlbumModule {}
