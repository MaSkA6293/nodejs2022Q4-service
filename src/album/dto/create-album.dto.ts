import { OmitType } from '@nestjs/mapped-types';
import { IsString, IsNumber } from 'class-validator';
import { AlbumEntity } from '../entities/album.entity';

export class CreateAlbumDto extends OmitType(AlbumEntity, ['id']) {
  @IsString()
  name: string;
  @IsNumber()
  year: number;

  artistId: string | null;
}
