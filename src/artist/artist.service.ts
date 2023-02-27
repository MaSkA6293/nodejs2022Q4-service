import { Injectable } from '@nestjs/common';
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
  ) {}
  async create(createArtistDto: CreateArtistDto): Promise<ArtistEntity> {
    const artist = new ArtistEntity().create(createArtistDto);

    const createdArtist = await this.artistRepository.save(artist);

    return createdArtist;
  }

  async findAll(): Promise<ArtistEntity[] | []> {
    const artists = await this.artistRepository.find();
    return artists;
  }

  async findOne(id: string): Promise<ArtistEntity> {
    const artist = await this.artistRepository.findOne({ where: { id } });

    if (!artist) return undefined;

    return artist;
  }

  async update(artist: ArtistEntity, updateArtistDto: UpdateArtistDto) {
    const update = artist.update(updateArtistDto);

    const result = await this.artistRepository.update(artist.id, update);

    if (result.affected) return update;
  }

  async remove(id: string): Promise<void> {
    await this.artistRepository.delete(id);
  }
}
