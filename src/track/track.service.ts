import { Injectable } from '@nestjs/common';
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
  ) {}
  async create(createTrackDto: CreateTrackDto): Promise<TrackEntity> {
    const track = new TrackEntity().create(createTrackDto);

    const createdTrack = await this.trackRepository.save(track);

    return createdTrack;
  }

  async findAll(): Promise<TrackEntity[] | []> {
    const track = await this.trackRepository.find();
    return track;
  }

  async findOne(id: string): Promise<TrackEntity | undefined> {
    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track) return undefined;

    return track;
  }

  async update(
    track: TrackEntity,
    updateTrackDto: UpdateTrackDto,
  ): Promise<TrackEntity> {
    const update = track.update(updateTrackDto);

    const result = await this.trackRepository.update(track.id, update);

    if (result.affected) return update;
  }

  async remove(id: string): Promise<void> {
    await this.trackRepository.delete(id);
  }
}
