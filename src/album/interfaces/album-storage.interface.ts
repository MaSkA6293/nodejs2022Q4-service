import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { AlbumEntity } from '../entities/album.entity';

export interface AlbumStore {
  findOne: (id: string) => AlbumEntity | undefined;
  findAll: () => AlbumEntity[];
  create: (params: CreateAlbumDto) => AlbumEntity;
  update: (id: string, update: UpdateAlbumDto) => AlbumEntity;
  remove: (id: string) => undefined;
}
