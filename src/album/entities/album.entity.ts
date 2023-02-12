import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { CreateAlbumDto } from '../dto/create-album.dto';

@Entity('album')
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column()
  artistId: string | null;

  update(updateAlbumDto: UpdateAlbumDto) {
    this.name = updateAlbumDto.name;
    this.year = updateAlbumDto.year;
    this.artistId = updateAlbumDto.artistId;
    return this;
  }

  create(createAlbumDto: CreateAlbumDto) {
    this.id = uuidv4();
    this.name = createAlbumDto.name;
    this.year = createAlbumDto.year;
    this.artistId = createAlbumDto.artistId;
    return this;
  }
}
