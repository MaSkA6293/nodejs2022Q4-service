import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { ArtistEntity } from 'src/artist/entities/artist.entity';

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

  @OneToOne(() => ArtistEntity, (artist) => artist.id, {
    onDelete: 'SET NULL',
  })
  artist: ArtistEntity;

  update(updateAlbumDto: UpdateAlbumDto) {
    const { name, year, artistId } = updateAlbumDto;

    this.name = name;
    this.year = year;
    this.artistId = artistId;
    return this;
  }

  create(createAlbumDto: CreateAlbumDto) {
    const { name, year, artistId } = createAlbumDto;

    this.id = uuidv4();
    this.name = name;
    this.year = year;
    this.artistId = artistId;
    return this;
  }
}
