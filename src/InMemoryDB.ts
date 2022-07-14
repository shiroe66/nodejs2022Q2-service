import { Injectable } from '@nestjs/common';
import { Artist } from './artist/entities/artist.entity';

@Injectable()
export class InMemoryDB {
  artists: Artist[] = [];
}
