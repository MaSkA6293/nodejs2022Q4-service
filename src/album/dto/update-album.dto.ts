import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { AlbumEntity } from '../entities/album.entity';

export class UpdateAlbumDto extends PartialType(OmitType(AlbumEntity, ['id'])) {
  @IsString()
  @IsNotEmpty({ message: 'request body does not contain required fields' })
  name: string;
  @IsNumber()
  @IsNotEmpty({ message: 'request body does not contain required fields' })
  year: number;

  artistId: string | null;
}
