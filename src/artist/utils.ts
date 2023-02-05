import { ArtistEntity } from './entities/artist.entity';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';

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
