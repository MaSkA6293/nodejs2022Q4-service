import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { TrackService } from 'src/track/track.service';
import {
  FavoriteStore,
  typeFavoriteEntity,
} from './interfaces/favorite-storage.interface';
import { ArtistService } from 'src/artist/artist.service';
import { AlbumService } from 'src/album/album.service';

@Injectable()
export class FavoriteService {
  constructor(
    @Inject('FavoriteStore') private storage: FavoriteStore,
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
    @Inject(forwardRef(() => AlbumService)) private albumService: AlbumService,
    @Inject(forwardRef(() => TrackService)) private trackService: TrackService,
  ) {}

  addTrack(id: string): boolean {
    const track = this.trackService.findOne(id);

    if (!track) return false;

    this.storage.add(typeFavoriteEntity.track, id);

    return true;
  }

  addAlbum(id: string): boolean {
    const album = this.albumService.findOne(id);

    if (!album) return false;

    this.storage.add(typeFavoriteEntity.album, id);

    return true;
  }

  addArtist(id: string): boolean {
    const artist = this.artistService.findOne(id);

    if (!artist) return false;

    this.storage.add(typeFavoriteEntity.artist, id);

    return true;
  }

  removeTrack(id: string): boolean {
    const record = this.storage.findOne(typeFavoriteEntity.track, id);
    if (!record) return false;

    this.storage.remove(typeFavoriteEntity.track, id);

    return true;
  }

  removeAlbum(id: string): boolean {
    const record = this.storage.findOne(typeFavoriteEntity.album, id);
    if (!record) return false;

    this.storage.remove(typeFavoriteEntity.album, id);

    return true;
  }

  removeArtist(id: string): boolean {
    const record = this.storage.findOne(typeFavoriteEntity.artist, id);
    if (!record) return false;

    this.storage.remove(typeFavoriteEntity.artist, id);

    return true;
  }

  findAll() {
    const favoritesIds = this.storage.findAll();
    return {
      tracks: favoritesIds.tracks.map((item) => {
        return this.trackService.findOne(item);
      }),
      albums: favoritesIds.albums.map((item) => {
        return this.albumService.findOne(item);
      }),
      artists: favoritesIds.artists.map((item) => {
        return this.artistService.findOne(item);
      }),
    };
  }
}
