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
} from '@nestjs/common';
import { invalidIdBadRequest, isValidId, notFoundError } from 'src/utils';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';
import { TrackService } from './track.service';
import { entity } from 'src/interfaces';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  findAll(): TrackEntity[] | [] {
    return this.trackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): TrackEntity | HttpException {
    if (!isValidId(id)) invalidIdBadRequest();

    const track = this.trackService.findOne(id);

    if (!track) notFoundError(entity.track);

    return track;
  }

  @Post()
  create(@Body() createTrackDto: CreateTrackDto): TrackEntity {
    return this.trackService.create(createTrackDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ): TrackEntity | HttpException {
    if (!isValidId(id)) invalidIdBadRequest();

    const track = this.trackService.update(id, updateTrackDto);

    if (!track) notFoundError(entity.track);

    return track;
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string): void | HttpException {
    if (!isValidId(id)) invalidIdBadRequest();

    const track = this.trackService.remove(id);

    if (!track) notFoundError(entity.track);
  }
}
