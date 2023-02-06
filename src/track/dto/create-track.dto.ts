import { OmitType } from '@nestjs/mapped-types';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { TrackEntity } from '../entities/track.entity';

export class CreateTrackDto extends OmitType(TrackEntity, ['id']) {
  @IsString()
  @IsNotEmpty({ message: 'request body does not contain required fields' })
  name: string;

  artistId: string | null;
  albumId: string | null;

  @IsNumber()
  @IsNotEmpty({ message: 'request body does not contain required fields' })
  duration: number;
}
