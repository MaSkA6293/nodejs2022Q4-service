import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { FavoriteEntity } from 'src/favorite/entities/favorite.entity';
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

  @ManyToOne(() => ArtistEntity, (artist) => artist.id, {
    onDelete: 'SET NULL',
  })
  artist: ArtistEntity;

  @ManyToOne(() => FavoriteEntity, (favorite) => favorite.albums, {
    onDelete: 'SET NULL',
  })
  favorites: FavoriteEntity;

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
