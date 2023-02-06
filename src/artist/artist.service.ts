import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { FavoriteService } from 'src/favorite/favorite.service';
import { TrackService } from 'src/track/track.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';
import { ArtistStore } from './interfaces/artist-storage.interface';
import { getUpdatedArtistEntity, createRecord } from './utils';

@Injectable()
export class ArtistService {
  constructor(
    @Inject('ArtistStore') private storage: ArtistStore,
    @Inject(forwardRef(() => FavoriteService))
    private favoriteService: FavoriteService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
  ) {}
  create(createArtistDto: CreateArtistDto): ArtistEntity {
    const record = createRecord(createArtistDto);
    return this.storage.create(record);
  }

  findAll(): ArtistEntity[] | [] {
    return this.storage.findAll();
  }

  findOne(id: string): ArtistEntity | null {
    const artist = this.storage.findOne(id);

    if (!artist) return undefined;

    return artist;
  }

  update(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): ArtistEntity | undefined {
    const artist = this.storage.findOne(id);

    if (!artist) return undefined;

    const update = getUpdatedArtistEntity(artist, updateArtistDto);

    return this.storage.update(id, update);
  }

  remove(id: string): boolean {
    const artist = this.storage.findOne(id);

    if (!artist) return false;

    this.favoriteService.removeArtist(id);
    this.trackService.removeArtist(id);
    this.storage.remove(id);

    return true;
  }
}
