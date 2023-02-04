import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsString, IsNumber } from 'class-validator';
import { AlbumEntity } from '../entities/album.entity';

export class UpdateAlbumDto extends PartialType(OmitType(AlbumEntity, ['id'])) {
  @IsString()
  name: string;
  @IsNumber()
  year: number;

  artistId: string | null;
}
