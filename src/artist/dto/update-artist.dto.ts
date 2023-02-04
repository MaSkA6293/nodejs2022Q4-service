import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsString, IsBoolean } from 'class-validator';
import { ArtistEntity } from '../entities/artist.entity';

export class UpdateArtistDto extends PartialType(
  OmitType(ArtistEntity, ['id']),
) {
  @IsString()
  name: string;

  @IsBoolean()
  grammy: boolean;
}
