import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';
import { TrackService } from './track.service';
import { TrackIsExistPipe } from './track.isExist.pipe';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  async findAll(): Promise<TrackEntity[] | []> {
    return await this.trackService.findAll();
  }

  @Get(':uuid')
  findOne(
    @Param('uuid', ParseUUIDPipe, TrackIsExistPipe) track: TrackEntity,
  ): TrackEntity {
    return track;
  }

  @Post()
  async create(@Body() createTrackDto: CreateTrackDto): Promise<TrackEntity> {
    return await this.trackService.create(createTrackDto);
  }

  @Put(':uuid')
  async update(
    @Param('uuid', ParseUUIDPipe, TrackIsExistPipe) track: TrackEntity,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Promise<TrackEntity> {
    const updatedTrack = await this.trackService.update(track, updateTrackDto);

    return updatedTrack;
  }

  @Delete(':uuid')
  @HttpCode(204)
  async remove(
    @Param('uuid', ParseUUIDPipe, TrackIsExistPipe) track: TrackEntity,
  ): Promise<void> {
    await this.trackService.remove(track.id);
  }
}
