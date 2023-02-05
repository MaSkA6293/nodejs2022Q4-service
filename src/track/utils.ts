import { TrackEntity } from './entities/track.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import { TrackStore } from './interfaces/track-storage.interface';
import { UpdateTrackDto } from './dto/update-track.dto';
import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';

export const checkTrack = (
  storage: TrackStore,
  id: string,
): TrackEntity | undefined => {
  const track = storage.findOne(id);
  if (!track)
    throw new HttpException(
      "record with id === trackId doesn't exist",
      HttpStatus.NOT_FOUND,
    );
  return track;
};

export const getUpdatedTrackEntity = (
  track: TrackEntity,
  updateTrackDto: UpdateTrackDto,
): TrackEntity => {
  return {
    ...track,
    ...updateTrackDto,
  };
};

export const createRecord = (createTrackDto: CreateTrackDto) => {
  return {
    ...createTrackDto,
    id: uuidv4(),
  };
};
