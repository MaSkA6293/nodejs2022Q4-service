import { AlbumEntity } from 'src/album/entities/album.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { TrackEntity } from 'src/track/entities/track.entity';
import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('favorite')
export class FavoriteEntity {
  @Exclude()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => ArtistEntity, (artist) => artist.favorites, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  artists: ArtistEntity[];

  @OneToMany(() => AlbumEntity, (album) => album.favorites, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  albums: AlbumEntity[];

  @OneToMany(() => TrackEntity, (track) => track.favorites, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  tracks: TrackEntity[];
}
