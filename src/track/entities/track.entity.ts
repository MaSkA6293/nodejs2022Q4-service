import { AlbumEntity } from 'src/album/entities/album.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { FavoriteEntity } from 'src/favorite/entities/favorite.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';

@Entity('track')
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  artistId: string;

  @Column({ nullable: true })
  albumId: string;

  @Column()
  duration: number;

  @ManyToOne(() => ArtistEntity, (artist) => artist.id, {
    onDelete: 'SET NULL',
  })
  artist: ArtistEntity;

  @ManyToOne(() => AlbumEntity, (album) => album.id, {
    onDelete: 'SET NULL',
  })
  album: AlbumEntity;

  @ManyToOne(() => FavoriteEntity, (favorite) => favorite.tracks, {
    onDelete: 'SET NULL',
  })
  favorites: FavoriteEntity;

  update(updateTrackDto: UpdateTrackDto) {
    const { name, artistId, albumId, duration } = updateTrackDto;

    this.name = name;
    this.artistId = artistId;
    this.albumId = albumId;
    this.duration = duration;
    return this;
  }

  create(createTrackDto: CreateTrackDto) {
    const { name, artistId, albumId, duration } = createTrackDto;

    this.id = uuidv4();
    this.name = name;
    this.artistId = artistId;
    this.albumId = albumId;
    this.duration = duration;
    return this;
  }
}
