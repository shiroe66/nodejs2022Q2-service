import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { FavouritesService } from '../favourites/favourites.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrackService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => FavouritesService))
    private readonly favouritesService: FavouritesService,
  ) {}

  async create(CreateTrackDto: CreateTrackDto): Promise<Track> {
    return await this.prisma.track.create({ data: CreateTrackDto });
  }

  async findAll(): Promise<Track[]> {
    return await this.prisma.track.findMany();
  }

  async findOne(id: string): Promise<Track> {
    const track = await this.prisma.track.findUnique({ where: { id } });

    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }

    return track;
  }

  async update(id: string, UpdateTrackDto: UpdateTrackDto): Promise<Track> {
    try {
      return await this.prisma.track.update({
        where: { id },
        data: UpdateTrackDto,
      });
    } catch (error) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.prisma.track.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
    this.favouritesService.removeAnywhere('tracks', id);
  }

  async removeAlbumId(id: string): Promise<void> {
    await this.prisma.track.updateMany({
      where: { albumId: { equals: id } },
      data: { albumId: null },
    });
  }

  async removeArtistId(id: string): Promise<void> {
    await this.prisma.track.updateMany({
      where: { artistId: { equals: id } },
      data: { artistId: null },
    });
  }
}
