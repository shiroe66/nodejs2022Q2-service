import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({
  controllers: [TrackController],
  exports: [TrackService],
  providers: [TrackService, PrismaService],
})
export class TrackModule {}
