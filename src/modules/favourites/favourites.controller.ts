import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavouritesService } from './favourites.service';

@Controller('favs')
export class FavouritesController {
  constructor(private readonly favouritesService: FavouritesService) {}

  @Get()
  @HttpCode(200)
  findAll() {
    return this.favouritesService.findAll();
  }

  @Post('/track/:id')
  @HttpCode(201)
  addTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favouritesService.add('track', id);
  }

  @Delete('/track/:id')
  @HttpCode(204)
  removeTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favouritesService.remove('track', id);
  }

  @Post('/album/:id')
  @HttpCode(201)
  addAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favouritesService.add('album', id);
  }

  @Delete('/album/:id')
  @HttpCode(204)
  removeAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favouritesService.remove('album', id);
  }

  @Post('/artist/:id')
  @HttpCode(201)
  addArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favouritesService.add('artist', id);
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  removeArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favouritesService.remove('artist', id);
  }
}
