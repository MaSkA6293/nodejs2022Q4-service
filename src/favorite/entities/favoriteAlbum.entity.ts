import {
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { AlbumEntity } from 'src/album/entities/album.entity';

@Entity('favoriteAlbum')
export class FavoriteAlbumEntity {
  @Exclude()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  albumId: string;

  @OneToOne(() => AlbumEntity, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  album: AlbumEntity[];
}
