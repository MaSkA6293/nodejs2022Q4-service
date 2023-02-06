import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { ArtistEntity } from '../entities/artist.entity';

export interface ArtistStore {
  findOne: (id: string) => ArtistEntity | undefined;
  findAll: () => ArtistEntity[];
  create: (params: CreateArtistDto) => ArtistEntity;
  update: (id: string, update: UpdateArtistDto) => ArtistEntity;
  remove: (id: string) => undefined;
}
