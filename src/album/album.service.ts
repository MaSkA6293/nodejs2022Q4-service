import { Inject, Injectable } from '@nestjs/common';
import { TrackService } from 'src/track/track.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumEntity } from './entities/album.entity';
import { AlbumStore } from './interfaces/album-storage.interface';

import {
  checkId,
  getUpdatedAlbumEntity,
  createRecord,
  checkAlbum,
} from './utils';

@Injectable()
export class AlbumService {
  constructor(
    @Inject('AlbumStore') private storage: AlbumStore,
    private trackService: TrackService,
  ) {}
  create(createAlbumDto: CreateAlbumDto): AlbumEntity {
    const record = createRecord(createAlbumDto);
    return this.storage.create(record);
  }

  findAll() {
    return this.storage.findAll();
  }

  findOne(id: string) {
    checkId(id);
    return checkAlbum(this.storage, id);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): AlbumEntity | undefined {
    checkId(id);

    const Album: AlbumEntity | undefined = checkAlbum(this.storage, id);

    const update = getUpdatedAlbumEntity(Album, updateAlbumDto);

    return this.storage.update(id, update);
  }

  remove(id: string) {
    checkId(id);
    checkAlbum(this.storage, id);
    this.trackService.removeAlbum(id);
    this.storage.remove(id);
  }
}
