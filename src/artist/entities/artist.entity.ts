import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
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
    const { name, grammy } = updateArtistDto;

    this.name = name;
    this.grammy = grammy;
    return this;
  }

  create(createArtistDto: CreateArtistDto) {
    const { name, grammy } = createArtistDto;

    this.id = uuidv4();
    this.name = name;
    this.grammy = grammy;
    return this;
  }
}
