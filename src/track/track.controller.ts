import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { isValidId } from 'src/utils';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';
import { TrackService } from './track.service';
import { HttpException, HttpStatus } from '@nestjs/common';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (isValidId(id)) {
      const track = this.trackService.findOne(id);
      if (track) return track;
      throw new HttpException(
        "record with id === trackId doesn't exist",
        HttpStatus.NOT_FOUND,
      );
    }
    throw new HttpException('id is invalid (not uuid)', HttpStatus.BAD_REQUEST);
  }

  @Post()
  create(@Body() createTrackDto: CreateTrackDto): TrackEntity {
    return this.trackService.create(createTrackDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ): TrackEntity {
    if (isValidId(id)) {
      const track = this.trackService.update(id, updateTrackDto);

      if (track) return track;

      throw new HttpException(
        "record with id === trackId doesn't exist",
        HttpStatus.NOT_FOUND,
      );
    }
    throw new HttpException('id is invalid (not uuid)', HttpStatus.BAD_REQUEST);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    if (isValidId(id)) {
      const track = this.trackService.remove(id);

      if (track) return track;

      throw new HttpException(
        "record with id === trackId doesn't exist",
        HttpStatus.NOT_FOUND,
      );
    }
    throw new HttpException('id is invalid (not uuid)', HttpStatus.BAD_REQUEST);
  }
}
