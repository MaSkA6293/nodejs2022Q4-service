import {
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { TrackEntity } from 'src/track/entities/track.entity';

@Entity('favoriteTrack')
export class FavoriteTrackEntity {
  @Exclude()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  trackId: string;

  @OneToOne(() => TrackEntity, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  track: TrackEntity[];
}
