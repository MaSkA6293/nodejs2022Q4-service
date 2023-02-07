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
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumEntity } from './entities/album.entity';
import { TrackIsExistPipe } from 'src/track/track.isExist.pipe';
import { AlbumIsExistPipe } from './album.isExist.pipe';

@Controller('Album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid', ParseUUIDPipe, TrackIsExistPipe) album: AlbumEntity) {
    return album;
  }

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto): AlbumEntity {
    return this.albumService.create(createAlbumDto);
  }

  @Put(':uuid')
  update(
    @Param('uuid', ParseUUIDPipe, AlbumIsExistPipe) album: AlbumEntity,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): AlbumEntity {
    return this.albumService.update(album, updateAlbumDto);
  }

  @Delete(':uuid')
  @HttpCode(204)
  remove(
    @Param('uuid', ParseUUIDPipe, AlbumIsExistPipe) album: AlbumEntity,
  ): void {
    this.albumService.remove(album);
  }
}
