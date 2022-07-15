import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  year: number;

  @ValidateIf((_, value) => value !== null)
  @IsUUID('4')
  artistId: string | null;
}
