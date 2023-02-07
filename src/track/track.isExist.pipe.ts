import { PipeTransform, Injectable } from '@nestjs/common';
import { entity } from 'src/interfaces';
import { notFoundError } from 'src/utils';
import { TrackEntity } from './entities/track.entity';
import { TrackService } from './track.service';

@Injectable()
export class TrackIsExistPipe implements PipeTransform<string, TrackEntity> {
  constructor(private readonly trackService: TrackService) {}

  transform(uuid: string): TrackEntity {
    const track = this.trackService.findOne(uuid);

    if (!track) notFoundError(entity.track);

    return track;
  }
}
