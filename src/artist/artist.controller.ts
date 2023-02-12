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
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';
import { ArtistService } from './artist.service';
import { ArtistIsExistPipe } from './artist.isExist.pipe';

@Controller('Artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':uuid')
  findOne(
    @Param('uuid', ParseUUIDPipe, ArtistIsExistPipe) artist: ArtistEntity,
  ): ArtistEntity {
    return artist;
  }

  @Post()
  create(@Body() createArtistDto: CreateArtistDto): Promise<ArtistEntity> {
    return this.artistService.create(createArtistDto);
  }

  @Put(':uuid')
  update(
    @Param('uuid', ParseUUIDPipe, ArtistIsExistPipe) artist: ArtistEntity,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Promise<ArtistEntity> {
    return this.artistService.update(artist, updateArtistDto);
  }

  @Delete(':uuid')
  @HttpCode(204)
  remove(
    @Param('uuid', ParseUUIDPipe, ArtistIsExistPipe) artist: ArtistEntity,
  ) {
    this.artistService.remove(artist.id);
  }
}
