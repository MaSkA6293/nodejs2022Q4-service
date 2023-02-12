import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { FavoriteService } from 'src/favorite/favorite.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
    @Inject(forwardRef(() => FavoriteService))
    private favoriteService: FavoriteService,
  ) {}
  async create(createTrackDto: CreateTrackDto) {
    const track = new TrackEntity().create(createTrackDto);

    const createdTrack = await this.trackRepository.save(track);

    return createdTrack;
  }

  async findAll() {
    const track = await this.trackRepository.find();
    return track;
  }

  async findOne(id: string) {
    const track = await this.trackRepository.findOne({ where: { id } });

    if (!track) return undefined;

    return track;
  }

  async update(track: TrackEntity, updateTrackDto: UpdateTrackDto) {
    const update = track.update(updateTrackDto);

    const result = await this.trackRepository.update(track.id, update);

    if (result.affected) return update;
  }

  remove(id: string): void {
    this.trackRepository.delete(id);
  }
}
