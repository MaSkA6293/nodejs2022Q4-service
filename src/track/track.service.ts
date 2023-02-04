import { Inject, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';
import { TrackStore } from './interfaces/track-storage.interface';

import {
  checkId,
  getUpdatedTrackEntity,
  createRecord,
  checkTrack,
} from './utils';

@Injectable()
export class TrackService {
  constructor(@Inject('TrackStore') private storage: TrackStore) {}
  create(createTrackDto: CreateTrackDto): TrackEntity {
    const record = createRecord(createTrackDto);
    return this.storage.create(record);
  }

  findAll() {
    return this.storage.findAll();
  }

  findOne(id: string) {
    checkId(id);
    return checkTrack(this.storage, id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto): TrackEntity | undefined {
    checkId(id);

    const track: TrackEntity | undefined = checkTrack(this.storage, id);

    const update = getUpdatedTrackEntity(track, updateTrackDto);

    return this.storage.update(id, update);
  }

  remove(id: string) {
    checkId(id);
    checkTrack(this.storage, id);
    this.storage.remove(id);
  }
}
