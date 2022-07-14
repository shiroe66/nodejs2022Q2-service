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

  findAll() {
    return this.inMemoryDB.artists;
  }

  findOne(id: string) {
    const artist = this.inMemoryDB.artists.find((artist) => artist.id === id);

    if (artist) {
      return artist;
    } else {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = this.inMemoryDB.artists.map((artist) => {
      if (artist.id === id) {
        artist = {
          ...updateArtistDto,
        };
      }
    });

    if (artist) {
      return {
        id,
        ...updateArtistDto,
      };
    }
  }

  remove(id: string) {
    this.inMemoryDB.artists = this.inMemoryDB.artists.filter(
      (artist) => artist.id !== id,
    );
    return `Artist with id: ${id} removed`;
  }
}
