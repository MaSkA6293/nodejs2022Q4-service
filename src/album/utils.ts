import { AlbumEntity } from './entities/album.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import { AlbumStore } from './interfaces/album-storage.interface';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';

export const checkAlbum = (
  storage: AlbumStore,
  id: string,
): AlbumEntity | undefined => {
  const Album = storage.findOne(id);
  if (!Album)
    throw new HttpException(
      "record with id === albumId doesn't exist",
      HttpStatus.NOT_FOUND,
    );
  return Album;
};

export const getUpdatedAlbumEntity = (
  Album: AlbumEntity,
  updateAlbumDto: UpdateAlbumDto,
): AlbumEntity => {
  const update: AlbumEntity = {
    ...Album,
    ...updateAlbumDto,
  };
  return update;
};

export const createRecord = (createAlbumDto: CreateAlbumDto) => {
  const record = {
    ...createAlbumDto,
    id: uuidv4(),
  };
  return record;
};
