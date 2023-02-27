import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumEntity } from './entities/album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
  ) {}
  async create(createAlbumDto: CreateAlbumDto): Promise<AlbumEntity> {
    const album = new AlbumEntity().create(createAlbumDto);

    const createdAlbum = await this.albumRepository.save(album);

    return createdAlbum;
  }

  async findAll(): Promise<AlbumEntity[]> {
    const albums = await this.albumRepository.find();
    return albums;
  }

  async findOne(id: string): Promise<AlbumEntity | undefined> {
    const album = await this.albumRepository.findOne({ where: { id } });

    if (!album) return undefined;

    return album;
  }

  async update(
    album: AlbumEntity,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<AlbumEntity> {
    const update = album.update(updateAlbumDto);

    const result = await this.albumRepository.update(album.id, update);

    if (result.affected) return update;
  }

  async remove(id: string): Promise<void> {
    await this.albumRepository.delete(id);
  }
}
