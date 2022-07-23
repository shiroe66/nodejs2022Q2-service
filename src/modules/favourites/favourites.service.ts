import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Favourites } from '@prisma/client';

@Injectable()
export class FavouritesService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Omit<Favourites, 'id'>> {
    const [item] = await this.prisma.favourites.findMany({
      select: {
        albums: {
          select: { id: true, name: true, year: true, artistId: true },
        },
        artists: {
          select: { id: true, name: true, grammy: true },
        },
        tracks: {
          select: {
            id: true,
            name: true,
            duration: true,
            artistId: true,
            albumId: true,
          },
        },
      },
    });
    return item;
  }

  async add(type: string, id: string): Promise<void> {
    const item = await this.prisma[type].findFirst({ where: { id } });

    if (!item) {
      throw new UnprocessableEntityException("ID doesn't exist");
    }

    const favourites = await this.prisma.favourites.findMany();

    if (!favourites.length) {
      const createdFavs = await this.prisma.favourites.create({ data: {} });

      await this.prisma[type].update({
        where: { id },
        data: { favouriteId: createdFavs.id },
      });
    } else {
      await this.prisma[type].update({
        where: { id },
        data: { favouriteId: favourites[0].id },
      });
    }

    return item;
  }

  async remove(type: string, id: string): Promise<void> {
    try {
      await this.prisma[type].update({
        where: { id },
        data: { favouriteId: { set: null } },
      });
    } catch (error) {
      throw new NotFoundException(`ID ${id} not found`);
    }
  }
}
