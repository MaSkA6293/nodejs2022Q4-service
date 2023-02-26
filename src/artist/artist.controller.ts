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
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';
import { ArtistService } from './artist.service';
import { ArtistIsExistPipe } from './artist.isExist.pipe';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('Artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  async findAll(): Promise<ArtistEntity[] | []> {
    return await this.artistService.findAll();
  }

  @Get(':uuid')
  findOne(
    @Param('uuid', ParseUUIDPipe, ArtistIsExistPipe) artist: ArtistEntity,
  ): ArtistEntity {
    return artist;
  }

  @Post()
  async create(
    @Body() createArtistDto: CreateArtistDto,
  ): Promise<ArtistEntity> {
    return await this.artistService.create(createArtistDto);
  }

  @Put(':uuid')
  async update(
    @Param('uuid', ParseUUIDPipe, ArtistIsExistPipe) artist: ArtistEntity,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Promise<ArtistEntity> {
    return await this.artistService.update(artist, updateArtistDto);
  }

  @Delete(':uuid')
  @HttpCode(204)
  async remove(
    @Param('uuid', ParseUUIDPipe, ArtistIsExistPipe) artist: ArtistEntity,
  ): Promise<void> {
    await this.artistService.remove(artist.id);
  }
}
