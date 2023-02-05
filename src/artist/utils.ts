import { ArtistEntity } from './entities/artist.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ArtistStore } from './interfaces/artist-storage.interface';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';

export const checkArtist = (
  storage: ArtistStore,
  id: string,
): ArtistEntity | undefined => {
  const Artist = storage.findOne(id);
  if (!Artist)
    throw new HttpException(
      "record with id === artistId doesn't exist",
      HttpStatus.NOT_FOUND,
    );
  return Artist;
};

export const getUpdatedArtistEntity = (
  Artist: ArtistEntity,
  updateArtistDto: UpdateArtistDto,
): ArtistEntity => {
  const update: ArtistEntity = {
    ...Artist,
    ...updateArtistDto,
  };
  return update;
};

export const createRecord = (createArtistDto: CreateArtistDto) => {
  const record = {
    ...createArtistDto,
    id: uuidv4(),
  };
  return record;
};
