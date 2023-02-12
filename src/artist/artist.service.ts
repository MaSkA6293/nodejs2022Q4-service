import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { FavoriteService } from 'src/favorite/favorite.service';
import { TrackService } from 'src/track/track.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
    @Inject(forwardRef(() => FavoriteService))
    private favoriteService: FavoriteService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
  ) {}
  async create(createArtistDto: CreateArtistDto) {
    const artist = new ArtistEntity().create(createArtistDto);

    const createdArtist = await this.artistRepository.save(artist);

    return createdArtist;
  }

  async findAll() {
    const artists = await this.artistRepository.find();
    return artists;
  }

  async findOne(id: string) {
    const artist = await this.artistRepository.findOne({ where: { id } });

    if (!artist) return undefined;

    return artist;
  }

  async update(artist: ArtistEntity, updateArtistDto: UpdateArtistDto) {
    const update = artist.update(updateArtistDto);

    const result = await this.artistRepository.update(artist.id, update);

    if (result.affected) return update;
  }

  remove(id: string): void {
    this.favoriteService.removeArtist(id);
    this.trackService.removeArtist(id);
    this.artistRepository.delete(id);
  }
}
