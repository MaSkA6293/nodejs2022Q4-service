import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';

@Entity('artist')
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  update(updateArtistDto: UpdateArtistDto) {
    this.name = updateArtistDto.name;
    this.grammy = updateArtistDto.grammy;
    return this;
  }

  create(createArtistDto: CreateArtistDto) {
    this.id = uuidv4();
    this.name = createArtistDto.name;
    this.grammy = createArtistDto.grammy;
    return this;
  }
}
