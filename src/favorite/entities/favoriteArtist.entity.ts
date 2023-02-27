import {
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { ArtistEntity } from 'src/artist/entities/artist.entity';

@Entity('favoriteArtist')
export class FavoriteArtistEntity {
  @Exclude()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  artistId: string;

  @OneToOne(() => ArtistEntity, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  artist: ArtistEntity[];
}
