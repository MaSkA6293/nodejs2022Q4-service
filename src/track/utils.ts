import { TrackEntity } from './entities/track.entity';
import { UpdateTrackDto } from './dto/update-track.dto';
import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';

export const getUpdatedTrackEntity = (
  track: TrackEntity,
  updateTrackDto: UpdateTrackDto,
): TrackEntity => {
  return {
    ...track,
    ...updateTrackDto,
  };
};

export const createRecord = (createTrackDto: CreateTrackDto): TrackEntity => {
  return {
    ...createTrackDto,
    id: uuidv4(),
  };
};
