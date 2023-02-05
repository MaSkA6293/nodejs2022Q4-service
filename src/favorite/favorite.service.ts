import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { TrackService } from 'src/track/track.service';
import {
  FavoriteStore,
  typeFavoriteEntity,
} from './interfaces/favorite-storage.interface';
import { HttpException, HttpStatus } from '@nestjs/common';
import { checkId } from 'src/utils';
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

  addTrack(id: string): { message: string } {
    try {
      this.trackService.findOne(id);
    } catch (e) {
      if (e.status === 400) {
        throw e;
      } else if (e.status === 404) {
        throw new HttpException(
          `track with id === trackId doesn't exist`,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }
    this.storage.add(typeFavoriteEntity.track, id);
    return {
      message:
        'track with id === trackId exists, and was successfully added to favorites',
    };
  }

  addAlbum(id: string): { message: string } {
    try {
      this.albumService.findOne(id);
    } catch (e) {
      if (e.status === 400) {
        throw e;
      } else if (e.status === 404) {
        throw new HttpException(
          `album with id === albumId doesn't exist`,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }
    this.storage.add(typeFavoriteEntity.album, id);
    return { message: 'album with id === albumId exists' };
  }

  addArtist(id: string): { message: string } {
    try {
      this.artistService.findOne(id);
    } catch (e) {
      if (e.status === 400) {
        throw e;
      } else if (e.status === 404) {
        throw new HttpException(
          `artist with id === artistId doesn't exist`,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }
    this.storage.add(typeFavoriteEntity.artist, id);
    return { message: 'artist with id === artistId exists' };
  }

  removeTrack(id: string): void {
    checkId(id);
    const record = this.storage.findOne(typeFavoriteEntity.track, id);
    if (!record)
      throw new HttpException(
        `corresponding track is not favorite`,
        HttpStatus.NOT_FOUND,
      );

    return this.storage.remove(typeFavoriteEntity.track, id);
  }

  removeAlbum(id: string): void {
    checkId(id);
    const record = this.storage.findOne(typeFavoriteEntity.album, id);
    if (!record)
      throw new HttpException(
        `corresponding album is not favorite`,
        HttpStatus.NOT_FOUND,
      );
    return this.storage.remove(typeFavoriteEntity.album, id);
  }

  removeArtist(id: string): void {
    checkId(id);
    const record = this.storage.findOne(typeFavoriteEntity.artist, id);
    if (!record)
      throw new HttpException(
        `corresponding artist is not favorite`,
        HttpStatus.NOT_FOUND,
      );
    return this.storage.remove(typeFavoriteEntity.artist, id);
  }

  clearTrack(id: string): void {
    return this.storage.remove(typeFavoriteEntity.track, id);
  }

  clearAlbum(id: string): void {
    return this.storage.remove(typeFavoriteEntity.album, id);
  }

  clearArtist(id: string): void {
    return this.storage.remove(typeFavoriteEntity.artist, id);
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
