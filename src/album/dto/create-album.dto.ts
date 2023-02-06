import { OmitType } from '@nestjs/mapped-types';
import { IsString, IsNumber, IsNotEmpty, ValidateIf } from 'class-validator';
import { AlbumEntity } from '../entities/album.entity';

export class CreateAlbumDto extends OmitType(AlbumEntity, ['id']) {
  @IsString()
  @IsNotEmpty({ message: 'request body does not contain required fields' })
  name: string;
  @IsNumber()
  @IsNotEmpty({ message: 'request body does not contain required fields' })
  year: number;
  @ValidateIf((object, value) => value !== null)
  artistId: string | null;
}
