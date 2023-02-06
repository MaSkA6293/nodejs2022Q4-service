import { AlbumEntity } from './entities/album.entity';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';

export const getUpdatedAlbumEntity = (
  Album: AlbumEntity,
  updateAlbumDto: UpdateAlbumDto,
): AlbumEntity => {
  return {
    ...Album,
    ...updateAlbumDto,
  };
};

export const createRecord = (createAlbumDto: CreateAlbumDto): AlbumEntity => {
  return {
    ...createAlbumDto,
    id: uuidv4(),
  };
};
