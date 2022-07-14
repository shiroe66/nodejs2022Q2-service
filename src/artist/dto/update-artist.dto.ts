import { PartialType } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';
import { CreateArtistDto } from './create-artist.dto';

export class UpdateArtistDto extends PartialType(CreateArtistDto) {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsBoolean()
  grammy: boolean;
}
