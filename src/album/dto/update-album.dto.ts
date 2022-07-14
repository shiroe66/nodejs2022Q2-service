import { PartialType } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { CreateAlbumDto } from './create-album.dto';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {
  @IsString()
  @IsOptional()
  name: string;

  @IsInt()
  @IsOptional()
  year: number;

  @IsString()
  @IsOptional()
  artistId: string | null;
}
