import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { FavoriteService } from 'src/favorite/favorite.service';
import { TrackService } from 'src/track/track.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumEntity } from './entities/album.entity';
import { AlbumStore } from './interfaces/album-storage.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
    @Inject('AlbumStore')
    private storage: AlbumStore,
    @Inject(forwardRef(() => FavoriteService))
    private favoriteService: FavoriteService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
  ) {}
  async create(createAlbumDto: CreateAlbumDto) {
    const artist = new AlbumEntity().create(createAlbumDto);

    const createdArtist = await this.albumRepository.save(artist);

    return createdArtist;
  }

  async findAll() {
    const albums = await this.albumRepository.find();
    return albums;
  }

  async findOne(id: string) {
    const album = await this.albumRepository.findOne({ where: { id } });

    if (!album) return undefined;

    return album;
  }

  async update(album: AlbumEntity, updateAlbumDto: UpdateAlbumDto) {
    const update = album.update(updateAlbumDto);

    const result = await this.albumRepository.update(album.id, update);

    if (result.affected) return update;
  }

  remove(id: string): void {
    this.trackService.removeAlbum(id);
    this.favoriteService.removeAlbum(id);
    this.albumRepository.delete(id);
  }
}
