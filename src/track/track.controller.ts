import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  HttpException,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';
import { TrackService } from './track.service';
import { TrackIsExistPipe } from './track.isExist.pipe';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  findAll(): Promise<TrackEntity[] | []> {
    return this.trackService.findAll();
  }

  @Get(':uuid')
  findOne(
    @Param('uuid', ParseUUIDPipe, TrackIsExistPipe) track: TrackEntity,
  ): TrackEntity {
    return track;
  }

  @Post()
  create(@Body() createTrackDto: CreateTrackDto): Promise<TrackEntity> {
    return this.trackService.create(createTrackDto);
  }

  @Put(':uuid')
  update(
    @Param('uuid', ParseUUIDPipe, TrackIsExistPipe) track: TrackEntity,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Promise<TrackEntity> | HttpException {
    const updatedTrack = this.trackService.update(track, updateTrackDto);

    return updatedTrack;
  }

  @Delete(':uuid')
  @HttpCode(204)
  remove(
    @Param('uuid', ParseUUIDPipe, TrackIsExistPipe) track: TrackEntity,
  ): void {
    this.trackService.remove(track.id);
  }
}
