import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { InMemoryDB } from 'src/helpers/InMemoryDB';

@Injectable()
export class ArtistService {
  constructor(private readonly inMemoryDB: InMemoryDB<Artist>) {}

  create(createArtistDto: CreateArtistDto): Artist {
    const artist = {
      ...createArtistDto,
      id: uuidv4(),
    };

    this.inMemoryDB.create(artist);
    return artist;
  }

  findAll(): Artist[] {
    return this.inMemoryDB.findAll();
  }

  findOne(id: string): Artist {
    const artist = this.inMemoryDB.findOne(id);

    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }

    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto): Artist {
    const artist = this.inMemoryDB.findOne(id);

    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }

    return this.inMemoryDB.update(id, updateArtistDto);
  }

  remove(id: string): string {
    const isRemoved = this.inMemoryDB.delete(id);

    if (isRemoved) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }

    return `Artist with id: ${id} removed`;
  }
}
