import { PipeTransform, Injectable } from '@nestjs/common';
import { entity } from 'src/interfaces';
import { notFoundError } from 'src/utils';
import { AlbumService } from './album.service';
import { AlbumEntity } from './entities/album.entity';

@Injectable()
export class AlbumIsExistPipe implements PipeTransform<string, AlbumEntity> {
  constructor(private readonly albumService: AlbumService) {}

  transform(uuid: string): AlbumEntity {
    const album = this.albumService.findOne(uuid);

    if (!album) notFoundError(entity.track);

    return album;
  }
}
