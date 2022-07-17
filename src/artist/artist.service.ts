import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { InMemoryDB } from 'src/helpers/InMemoryDB';
import { FavouritesService } from 'src/favourites/favourites.service';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class ArtistService {
  constructor(
    private readonly inMemoryDB: InMemoryDB<Artist>,
    @Inject(forwardRef(() => FavouritesService))
    private readonly favouritesService: FavouritesService,
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
  ) {}

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

  remove(id: string) {
    const isNotRemoved = this.inMemoryDB.delete(id);

    if (isNotRemoved) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }

    this.albumService.removeArtistId(id);
    this.trackService.removeArtistId(id);
    this.favouritesService.removeAnywhere('artists', id);
  }
}
