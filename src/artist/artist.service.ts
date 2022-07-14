import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { InMemoryDB } from 'src/InMemoryDB';

@Injectable()
export class ArtistService {
  constructor(private readonly inMemoryDB: InMemoryDB) {}

  create(createArtistDto: CreateArtistDto): Artist {
    const artist = {
      ...createArtistDto,
      id: uuidv4(),
    };

    this.inMemoryDB.artists.push(artist);
    return artist;
  }

  findAll(): Artist[] {
    return this.inMemoryDB.artists;
  }

  findOne(id: string): Artist {
    const artist = this.inMemoryDB.artists.find((artist) => artist.id === id);

    if (artist) {
      return artist;
    } else {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }
  }

  update(id: string, updateArtistDto: UpdateArtistDto): Artist {
    const index = this.inMemoryDB.artists.findIndex(
      (artist) => artist.id === id,
    );

    if (index === -1) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    } else {
      return (this.inMemoryDB.artists[index] = {
        ...this.inMemoryDB.artists[index],
        ...updateArtistDto,
      });
    }
  }

  remove(id: string): string {
    const length = this.inMemoryDB.artists.length;

    this.inMemoryDB.artists = this.inMemoryDB.artists.filter(
      (artist) => artist.id !== id,
    );

    if (length === this.inMemoryDB.artists.length) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    } else {
      return `Artist with id: ${id} removed`;
    }
  }
}
