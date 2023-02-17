import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { TrackService } from 'src/track/track.service';
import { ArtistService } from 'src/artist/artist.service';
import { AlbumService } from 'src/album/album.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoriteAlbumEntity } from './entities/favoriteAlbum.entity';
import { FavoriteArtistEntity } from './entities/favoriteArtist.entity';
import { FavoriteTrackEntity } from './entities/favoriteTrack.entity';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(FavoriteAlbumEntity)
    private favoriteAlbumRepository: Repository<FavoriteAlbumEntity>,
    @InjectRepository(FavoriteTrackEntity)
    private favoriteTrackRepository: Repository<FavoriteTrackEntity>,
    @InjectRepository(FavoriteArtistEntity)
    private favoriteArtistRepository: Repository<FavoriteArtistEntity>,
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
    @Inject(forwardRef(() => AlbumService)) private albumService: AlbumService,
    @Inject(forwardRef(() => TrackService)) private trackService: TrackService,
  ) {}

  async addTrack(id: string): Promise<boolean> {
    const track = await this.trackService.findOne(id);

    if (!track) return false;

    await this.favoriteTrackRepository.save({ trackId: id });
    return true;
  }

  async addAlbum(id: string): Promise<boolean> {
    const album = await this.albumService.findOne(id);

    if (!album) return false;

    await this.favoriteAlbumRepository.save({ albumId: id });
    return true;
  }

  async addArtist(id: string): Promise<boolean> {
    const artist = await this.artistService.findOne(id);

    if (!artist) return false;

    await this.favoriteArtistRepository.save({ artistId: id });
    return true;
  }

  async removeTrack(id: string): Promise<boolean> {
    await this.favoriteTrackRepository.delete({ trackId: id });

    return true;
  }

  async removeAlbum(id: string): Promise<boolean> {
    await this.favoriteAlbumRepository.delete({ albumId: id });

    return true;
  }

  async removeArtist(id: string): Promise<boolean> {
    await this.favoriteArtistRepository.delete({ artistId: id });

    return true;
  }

  async findAll(): Promise<any> {
    const favRelationsAlbum = await this.favoriteAlbumRepository.find({
      relations: ['album'],
    });
    const favRelationsArtist = await this.favoriteArtistRepository.find({
      relations: ['artist'],
    });
    const favRelationsTrack = await this.favoriteTrackRepository.find({
      relations: ['track'],
    });
    return {
      artists: favRelationsArtist.map((el: FavoriteArtistEntity) => el.artist),
      tracks: favRelationsTrack.map((el: FavoriteTrackEntity) => el.track),
      albums: favRelationsAlbum.map((el: FavoriteAlbumEntity) => el.album),
    };
  }
}
