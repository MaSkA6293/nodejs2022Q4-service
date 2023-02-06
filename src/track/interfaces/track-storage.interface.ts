import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { TrackEntity } from '../entities/track.entity';

export interface TrackStore {
  findOne: (id: string) => TrackEntity | undefined;
  findAll: () => TrackEntity[];
  create: (params: CreateTrackDto) => TrackEntity;
  update: (id: string, update: UpdateTrackDto) => TrackEntity;
  remove: (id: string) => void;
  removeAlbum: (id: string) => void;
  removeArtist: (id: string) => void;
}
