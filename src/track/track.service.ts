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
    private inMemoryDB: InMemoryDB<Track>,
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
    try {
      this.inMemoryDB.findOne(id);
      return this.inMemoryDB.update(id, UpdateTrackDto);
    } catch (error) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
  }

  remove(id: string) {
    const isRemoved = this.inMemoryDB.delete(id);

    if (isRemoved) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }

    this.favouritesService.removeAnywhere('tracks', id);
  }

  removeAlbumId(id: string) {
    const tracks = this.inMemoryDB.findAll();

    this.inMemoryDB.list = tracks.map((track) => {
      if (track && track.albumId === id) {
        track.albumId = null;
        return track;
      }
      return track;
    });
  }

  removeArtistId(id: string) {
    const tracks = this.inMemoryDB.findAll();

    this.inMemoryDB.list = tracks.map((track) => {
      if (track && track.artistId === id) {
        track.artistId = null;
        return track;
      }
      return track;
    });
  }
}
