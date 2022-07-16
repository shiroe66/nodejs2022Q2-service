import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InMemoryDB } from 'src/helpers/InMemoryDB';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { v4 as uuidv4 } from 'uuid';
import { FavouritesService } from 'src/favourites/favourites.service';

@Injectable()
export class TrackService {
  constructor(
    private readonly inMemoryDB: InMemoryDB<Track>,
    @Inject(forwardRef(() => FavouritesService))
    private readonly favouritesService: FavouritesService,
  ) {}

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
    const track = this.inMemoryDB.findOne(id);

    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }

    return this.inMemoryDB.update(id, UpdateTrackDto);
  }

  remove(id: string) {
    const isRemoved = this.inMemoryDB.delete(id);

    if (isRemoved) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }

    this.favouritesService.removeAnywhere('tracks', id);
  }
}
