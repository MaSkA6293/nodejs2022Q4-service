import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsString, IsNumber } from 'class-validator';
import { TrackEntity } from '../entities/track.entity';

export class UpdateTrackDto extends PartialType(OmitType(TrackEntity, ['id'])) {
  @IsString()
  name: string;

  artistId: string | null;
  albumId: string | null;

  @IsNumber()
  duration: number;
}
