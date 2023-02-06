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
import { invalidIdBadRequest, isValidId, notFoundError } from 'src/utils';
import { entity } from 'src/interfaces';

@Controller('Artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!isValidId(id)) invalidIdBadRequest();

    const artist = this.artistService.findOne(id);

    if (!artist) notFoundError(entity.artist);

    return artist;
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
    if (!isValidId(id)) invalidIdBadRequest();

    const track = this.artistService.update(id, updateArtistDto);

    if (!track) notFoundError(entity.artist);

    return track;
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    if (!isValidId(id)) invalidIdBadRequest();

    const artist = this.artistService.remove(id);

    if (!artist) notFoundError(entity.artist);

    return artist;
  }
}
