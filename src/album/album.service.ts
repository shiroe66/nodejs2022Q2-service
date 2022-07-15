import { Injectable, NotFoundException } from '@nestjs/common';
import { InMemoryDB } from 'src/helpers/InMemoryDB';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AlbumService {
  constructor(private readonly inMemoryDB: InMemoryDB<Album>) {}

  create(CreateAlbumDto: CreateAlbumDto): Album {
    const album = {
      ...CreateAlbumDto,
      id: uuidv4(),
    };

    this.inMemoryDB.create(album);
    return album;
  }

  findAll(): Album[] {
    return this.inMemoryDB.findAll();
  }

  findOne(id: string): Album {
    const album = this.inMemoryDB.findOne(id);

    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }

    return album;
  }

  update(id: string, UpdateAlbumDto: UpdateAlbumDto): Album {
    const album = this.inMemoryDB.findOne(id);

    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }

    return this.inMemoryDB.update(id, UpdateAlbumDto);
  }

  remove(id: string): string {
    const isRemoved = this.inMemoryDB.delete(id);

    if (isRemoved) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }

    return `Album with id: ${id} removed`;
  }
}
