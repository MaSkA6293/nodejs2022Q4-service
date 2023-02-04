import { TrackEntity } from './entities/track.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import { validate as uuidValidate } from 'uuid';
import { TrackStore } from './interfaces/track-storage.interface';
import { UpdateTrackDto } from './dto/update-track.dto';
import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';

export const checkId = (id: string) => {
  const checkId = uuidValidate(id);

  if (!checkId)
    throw new HttpException('id is invalid (not uuid)', HttpStatus.BAD_REQUEST);
};

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
  const update: TrackEntity = {
    ...track,
    ...updateTrackDto,
  };
  return update;
};

export const createRecord = (createTrackDto: CreateTrackDto) => {
  const record = {
    ...createTrackDto,
    id: uuidv4(),
  };
  return record;
};
