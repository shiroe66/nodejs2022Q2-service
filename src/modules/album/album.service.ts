import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { v4 as uuidv4 } from 'uuid';
import { FavouritesService } from '../favourites/favourites.service';
import { TrackService } from '../track/track.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => FavouritesService))
    private readonly favouritesService: FavouritesService,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
  ) {}

  async create(CreateAlbumDto: CreateAlbumDto): Promise<Album> {
    return await this.prisma.album.create({ data: CreateAlbumDto });
  }

  async findAll(): Promise<Album[]> {
    return await this.prisma.album.findMany();
  }

  async findOne(id: string): Promise<Album> {
    const album = await this.prisma.album.findUnique({ where: { id } });

    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }

    return album;
  }

  async update(id: string, UpdateAlbumDto: UpdateAlbumDto): Promise<Album> {
    try {
      return await this.prisma.album.update({
        where: { id },
        data: UpdateAlbumDto,
      });
    } catch (error) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.album.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }

    this.trackService.removeAlbumId(id);
    this.favouritesService.removeAnywhere('albums', id);
  }

  async removeArtistId(id: string) {
    this.prisma.album.updateMany({
      where: { artistId: { equals: id } },
      data: { artistId: null },
    });
  }
}
