import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { InMemoryDB } from 'src/helpers/InMemoryDB';
import { TrackService } from 'src/track/track.service';
import { Favourite } from './entities/favourite.entity';

type IDType = { id: string };
type StoreType = Record<keyof Favourite, InMemoryDB<IDType>>;

@Injectable()
export class FavouritesService {
  inMemoryStore: StoreType;

  constructor(
    @Inject(forwardRef(() => ArtistService))
    private artistsService: ArtistService,
    @Inject(forwardRef(() => AlbumService))
    private albumsService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private tracksService: TrackService,
  ) {
    this.inMemoryStore = {
      artists: new InMemoryDB(),
      albums: new InMemoryDB(),
      tracks: new InMemoryDB(),
    };
  }

  findAll(): StoreType {
    return this.inMemoryStore;
  }

  add(type: string, id: string) {
    const service = this[`${type}Service`];

    try {
      const findById = service.findOne(id);

      return this.inMemoryStore[type].create(findById);
    } catch (error) {
      throw new UnprocessableEntityException("ID doesn't exist");
    }
  }

  remove(type: string, id: string) {
    const isRemoved = this.inMemoryStore[type].delete(id);

    if (isRemoved) {
      throw new NotFoundException(`ID ${id} not found`);
    }
  }
}
