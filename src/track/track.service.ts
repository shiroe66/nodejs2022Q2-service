import { Injectable, NotFoundException } from '@nestjs/common';
import { InMemoryDB } from 'src/helpers/InMemoryDB';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TrackService {
  constructor(private readonly inMemoryDB: InMemoryDB<Track>) {}

  create(CreateTrackDto: CreateTrackDto): Track {
    const track = {
      ...CreateTrackDto,
      id: uuidv4(),
    };

    this.inMemoryDB.create(track);
    return track;
  }

  findAll(): Track[] {
    return this.inMemoryDB.findAll();
  }

  findOne(id: string): Track {
    const track = this.inMemoryDB.findOne(id);

    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }

    return track;
  }

  update(id: string, UpdateTrackDto: UpdateTrackDto): Track {
    return this.inMemoryDB.update(id, UpdateTrackDto);
  }

  remove(id: string): string {
    const isRemoved = this.inMemoryDB.delete(id);

    if (isRemoved) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }

    return `Track with id: ${id} removed`;
  }
}
