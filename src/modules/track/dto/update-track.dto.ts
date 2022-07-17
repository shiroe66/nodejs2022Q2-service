import { PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateTrackDto } from './create-track.dto';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
  @IsOptional()
  name: string;

  @IsOptional()
  artistId: string | null;

  @IsOptional()
  albumId: string | null;

  @IsOptional()
  duration: number;
}
