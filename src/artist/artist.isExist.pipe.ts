import { PipeTransform, Injectable } from '@nestjs/common';
import { entity } from 'src/interfaces';
import { notFoundError } from 'src/utils';

import { ArtistEntity } from './entities/artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistIsExistPipe
  implements PipeTransform<string, Promise<ArtistEntity>>
{
  constructor(
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
  ) {}

  async transform(uuid: string) {
    const artist = await this.artistRepository.findOne({ where: { id: uuid } });

    if (!artist) notFoundError(entity.artist);

    return artist;
  }
}
