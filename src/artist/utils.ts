import { ArtistEntity } from './entities/artist.entity';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';

export const getUpdatedArtistEntity = (
  Artist: ArtistEntity,
  updateArtistDto: UpdateArtistDto,
): ArtistEntity => {
  return {
    ...Artist,
    ...updateArtistDto,
  };
};

export const createRecord = (
  createArtistDto: CreateArtistDto,
): ArtistEntity => {
  return {
    ...createArtistDto,
    id: uuidv4(),
  };
};
