import { forwardRef, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { TrackService } from 'src/track/track.service';
import { ArtistService } from 'src/artist/artist.service';
import { AlbumService } from 'src/album/album.service';
import { FavoriteEntity } from './entities/favorite.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FavoriteService implements OnModuleInit {
  constructor(
    @InjectRepository(FavoriteEntity)
    private favoriteRepository: Repository<FavoriteEntity>,
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
    @Inject(forwardRef(() => AlbumService)) private albumService: AlbumService,
    @Inject(forwardRef(() => TrackService)) private trackService: TrackService,
  ) {}

  async onModuleInit() {
    const favorites = await this.favoriteRepository.findOne({
      where: {},
      relations: ['artists', 'albums', 'tracks'],
    });

    if (favorites) return;

    const createdFavorites = this.favoriteRepository.create({
      artists: [],
      albums: [],
      tracks: [],
    });

    await this.favoriteRepository.save(createdFavorites);
  }

  async addTrack(id: string): Promise<boolean> {
    const favorites = await this.findAll();

    const track = await this.trackService.findOne(id);

    if (!track) return false;

    const tracks = favorites.tracks;
    tracks.push(track);
    favorites.tracks = tracks;
    await this.favoriteRepository.save(favorites);
    return true;
  }

  async addAlbum(id: string): Promise<boolean> {
    const favorites = await this.findAll();

    const album = await this.albumService.findOne(id);

    if (!album) return false;

    const albums = favorites.albums;
    albums.push(album);
    favorites.albums = albums;
    await this.favoriteRepository.save(favorites);
    return true;
  }

  async addArtist(id: string): Promise<boolean> {
    const favorites = await this.findAll();

    const artist = await this.artistService.findOne(id);

    if (!artist) return false;

    const artists = favorites.artists;
    artists.push(artist);
    favorites.artists = artists;
    await this.favoriteRepository.save(favorites);
    return true;
  }

  async removeTrack(id: string): Promise<boolean> {
    const favorites = await this.findAll();

    const lengthTracks = favorites.tracks.length;

    favorites.tracks = favorites.tracks.filter((el) => el.id !== id);

    if (lengthTracks === favorites.tracks.length) return false;

    await this.favoriteRepository.save(favorites);

    return true;
  }

  async removeAlbum(id: string): Promise<boolean> {
    const favorites = await this.findAll();

    const lengthAlbums = favorites.albums.length;

    favorites.albums = favorites.albums.filter((el) => el.id !== id);

    if (lengthAlbums === favorites.albums.length) return false;

    await this.favoriteRepository.save(favorites);

    return true;
  }

  async removeArtist(id: string): Promise<boolean> {
    const favorites = await this.findAll();

    const lengthArtists = favorites.artists.length;

    favorites.artists = favorites.artists.filter((el) => el.id !== id);

    if (lengthArtists === favorites.artists.length) return false;

    await this.favoriteRepository.save(favorites);

    return true;
  }

  async findAll(): Promise<FavoriteEntity> {
    const favorites = await this.favoriteRepository.findOne({
      where: {},
      relations: ['artists', 'albums', 'tracks'],
    });

    return favorites;
  }
}
