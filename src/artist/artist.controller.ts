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

@Controller('Artist')
export class ArtistController {
  constructor(private readonly ArtistService: ArtistService) {}

  @Get()
  findAll() {
    return this.ArtistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ArtistService.findOne(id);
  }

  @Post()
  create(@Body() createArtistDto: CreateArtistDto): ArtistEntity {
    return this.ArtistService.create(createArtistDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ): ArtistEntity {
    return this.ArtistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.ArtistService.remove(id);
  }
}
