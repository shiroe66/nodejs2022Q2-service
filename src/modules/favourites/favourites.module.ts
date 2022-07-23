import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FavouritesController } from './favourites.controller';
import { FavouritesService } from './favourites.service';

@Module({
  controllers: [FavouritesController],
  providers: [FavouritesService, PrismaService],
  exports: [FavouritesService],
})
export class FavouritesModule {}
