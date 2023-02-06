import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { FavoriteService } from 'src/favorite/favorite.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';
import { TrackStore } from './interfaces/track-storage.interface';
import { getUpdatedTrackEntity, createRecord } from './utils';

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

  findAll(): TrackEntity[] | [] {
    return this.storage.findAll();
  }

  findOne(id: string): TrackEntity | undefined {
    const track = this.storage.findOne(id);

    if (!track) return undefined;

    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto): TrackEntity | undefined {
    const track = this.storage.findOne(id);

    if (!track) return undefined;

    const update = getUpdatedTrackEntity(track, updateTrackDto);

    return this.storage.update(id, update);
  }

  remove(id: string): boolean {
    const track = this.storage.findOne(id);

    if (!track) return undefined;

    this.favoriteService.removeTrack(id);
    this.storage.remove(id);

    return true;
  }

  removeAlbum(id: string): void {
    this.storage.removeAlbum(id);
  }

  removeArtist(id: string): void {
    this.storage.removeArtist(id);
  }
}
