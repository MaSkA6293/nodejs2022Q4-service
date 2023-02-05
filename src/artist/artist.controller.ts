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
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';
import { ArtistService } from './artist.service';
import { isValidId } from 'src/utils';
import { HttpException, HttpStatus } from '@nestjs/common';

@Controller('Artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (isValidId(id)) {
      const artist = this.artistService.findOne(id);
      if (artist) return artist;
      throw new HttpException(
        "record with id === artistId doesn't exist",
        HttpStatus.NOT_FOUND,
      );
    }
    throw new HttpException('id is invalid (not uuid)', HttpStatus.BAD_REQUEST);
  }

  @Post()
  create(@Body() createArtistDto: CreateArtistDto): ArtistEntity {
    return this.artistService.create(createArtistDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ): ArtistEntity {
    if (isValidId(id)) {
      const track = this.artistService.update(id, updateArtistDto);

      if (track) return track;

      throw new HttpException(
        "record with id === artistId doesn't exist",
        HttpStatus.NOT_FOUND,
      );
    }
    throw new HttpException('id is invalid (not uuid)', HttpStatus.BAD_REQUEST);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    if (isValidId(id)) {
      const artist = this.artistService.remove(id);

      if (artist) return artist;

      throw new HttpException(
        "record with id === artistId doesn't exist",
        HttpStatus.NOT_FOUND,
      );
    }
    throw new HttpException('id is invalid (not uuid)', HttpStatus.BAD_REQUEST);
  }
}
