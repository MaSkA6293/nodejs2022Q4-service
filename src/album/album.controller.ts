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
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumEntity } from './entities/album.entity';

@Controller('Album')
export class AlbumController {
  constructor(private readonly AlbumService: AlbumService) {}

  @Get()
  findAll() {
    return this.AlbumService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.AlbumService.findOne(id);
  }

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto): AlbumEntity {
    return this.AlbumService.create(createAlbumDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): AlbumEntity {
    return this.AlbumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.AlbumService.remove(id);
  }
}
