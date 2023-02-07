import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { FavoriteService } from 'src/favorite/favorite.service';
import { TrackService } from 'src/track/track.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumEntity } from './entities/album.entity';
import { AlbumStore } from './interfaces/album-storage.interface';
import { getUpdatedAlbumEntity, createRecord } from './utils';

@Injectable()
export class AlbumService {
  constructor(
    @Inject('AlbumStore')
    private storage: AlbumStore,
    @Inject(forwardRef(() => FavoriteService))
    private favoriteService: FavoriteService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
  ) {}
  create(createAlbumDto: CreateAlbumDto): AlbumEntity {
    const record = createRecord(createAlbumDto);
    return this.storage.create(record);
  }

  findAll(): AlbumEntity[] | [] {
    return this.storage.findAll();
  }

  findOne(id: string): AlbumEntity | undefined {
    const album = this.storage.findOne(id);

    if (!album) return undefined;

    return album;
  }

  update(album: AlbumEntity, updateAlbumDto: UpdateAlbumDto): AlbumEntity {
    const update = getUpdatedAlbumEntity(album, updateAlbumDto);

    return this.storage.update(album.id, update);
  }

  remove(id: string): void {
    this.trackService.removeAlbum(id);
    this.favoriteService.removeAlbum(id);
    this.storage.remove(id);
  }
}
