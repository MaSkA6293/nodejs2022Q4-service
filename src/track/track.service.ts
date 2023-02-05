import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { FavoriteService } from 'src/favorite/favorite.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';
import { TrackStore } from './interfaces/track-storage.interface';
import { checkId } from 'src/utils';
import { getUpdatedTrackEntity, createRecord, checkTrack } from './utils';

@Injectable()
export class TrackService {
  constructor(
    @Inject('TrackStore') private storage: TrackStore,
    @Inject(forwardRef(() => FavoriteService))
    private favoriteService: FavoriteService,
  ) {}
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
    this.favoriteService.clearTrack(id);
    this.storage.remove(id);
  }

  removeAlbum(id: string) {
    this.storage.removeAlbum(id);
  }

  removeArtist(id: string) {
    this.storage.removeArtist(id);
  }
}
