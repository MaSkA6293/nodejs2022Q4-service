import { PipeTransform, Injectable } from '@nestjs/common';
import { entity } from 'src/interfaces';
import { notFoundError } from 'src/utils';
import { AlbumEntity } from './entities/album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumIsExistPipe
  implements PipeTransform<string, Promise<AlbumEntity>>
{
  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
  ) {}

  async transform(uuid: string) {
    const album = await this.albumRepository.findOne({ where: { id: uuid } });

    if (!album) notFoundError(entity.album);

    return album;
  }
}
