import { OmitType } from '@nestjs/mapped-types';
import { IsString, IsBoolean, IsNotEmpty } from 'class-validator';
import { ArtistEntity } from '../entities/artist.entity';

export class CreateArtistDto extends OmitType(ArtistEntity, ['id']) {
  @IsString()
  @IsNotEmpty({ message: 'request body does not contain required fields' })
  name: string;
  @IsBoolean()
  @IsNotEmpty({ message: 'request body does not contain required fields' })
  grammy: boolean;
}
