import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @ValidateIf((_, value) => value !== null)
  @IsUUID('4')
  artistId: string | null;

  @ValidateIf((_, value) => value !== null)
  @IsUUID('4')
  albumId: string | null;

  @IsInt()
  @IsPositive()
  duration: number;
}
