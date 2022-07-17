import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InMemoryDB } from 'src/helpers/InMemoryDB';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { v4 as uuidv4 } from 'uuid';
import { FavouritesService } from 'src/favourites/favourites.service';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class AlbumService {
  constructor(
    private readonly inMemoryDB: InMemoryDB<Album>,
    @Inject(forwardRef(() => FavouritesService))
    private readonly favouritesService: FavouritesService,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
  ) {}

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

  remove(id: string) {
    const isNotRemoved = this.inMemoryDB.delete(id);

    if (isNotRemoved) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }

    this.trackService.removeAlbumId(id);
    this.favouritesService.removeAnywhere('albums', id);
  }

  removeArtistId(id: string) {
    const albums = this.inMemoryDB.findAll();

    this.inMemoryDB.list = albums.map((album) => {
      if (album.artistId === id) {
        return (album.artistId = null);
      }
      return album;
    });
  }
}
