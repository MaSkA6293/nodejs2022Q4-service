import { PipeTransform, Injectable } from '@nestjs/common';
import { entity } from 'src/interfaces';
import { notFoundError } from 'src/utils';
import { TrackEntity } from './entities/track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TrackIsExistPipe
  implements PipeTransform<string, Promise<TrackEntity>>
{
  constructor(
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
  ) {}

  async transform(uuid: string) {
    const track = await this.trackRepository.findOne({ where: { id: uuid } });

    if (!track) notFoundError(entity.track);

    return track;
  }
}
