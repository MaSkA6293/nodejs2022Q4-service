import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { FavoriteService } from 'src/favorite/favorite.service';
import { TrackService } from 'src/track/track.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';
import { ArtistStore } from './interfaces/artist-storage.interface';
import { checkId } from 'src/utils';
import { getUpdatedArtistEntity, createRecord, checkArtist } from './utils';

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

  findAll() {
    return this.storage.findAll();
  }

  findOne(id: string) {
    checkId(id);
    return checkArtist(this.storage, id);
  }

  update(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): ArtistEntity | undefined {
    checkId(id);

    const Artist: ArtistEntity | undefined = checkArtist(this.storage, id);

    const update = getUpdatedArtistEntity(Artist, updateArtistDto);

    return this.storage.update(id, update);
  }

  remove(id: string) {
    checkId(id);
    checkArtist(this.storage, id);
    this.favoriteService.clearArtist(id);
    this.trackService.removeArtist(id);
    this.storage.remove(id);
  }
}
