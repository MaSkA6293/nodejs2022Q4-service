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
import { AlbumIsExistPipe } from './album.isExist.pipe';

@Controller('Album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  async findAll(): Promise<AlbumEntity[]> {
    return await this.albumService.findAll();
  }

  @Get(':uuid')
  findOne(
    @Param('uuid', ParseUUIDPipe, AlbumIsExistPipe) album: AlbumEntity,
  ): AlbumEntity {
    return album;
  }

  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto): Promise<AlbumEntity> {
    const album = await this.albumService.create(createAlbumDto);
    return album;
  }

  @Put(':uuid')
  async update(
    @Param('uuid', ParseUUIDPipe, AlbumIsExistPipe) album: AlbumEntity,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Promise<AlbumEntity> {
    return await this.albumService.update(album, updateAlbumDto);
  }

  @Delete(':uuid')
  @HttpCode(204)
  async remove(
    @Param('uuid', ParseUUIDPipe, AlbumIsExistPipe) album: AlbumEntity,
  ): Promise<void> {
    await this.albumService.remove(album.id);
  }
}
