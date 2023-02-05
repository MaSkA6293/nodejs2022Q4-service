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
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumEntity } from './entities/album.entity';
import { HttpException, HttpStatus } from '@nestjs/common';

@Controller('Album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (isValidId(id)) {
      const album = this.albumService.findOne(id);
      if (album) return album;
      throw new HttpException(
        "record with id === albumId doesn't exist",
        HttpStatus.NOT_FOUND,
      );
    }
    throw new HttpException('id is invalid (not uuid)', HttpStatus.BAD_REQUEST);
  }

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto): AlbumEntity {
    return this.albumService.create(createAlbumDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): AlbumEntity {
    if (isValidId(id)) {
      const album = this.albumService.update(id, updateAlbumDto);

      if (album) return album;

      throw new HttpException(
        "record with id === albumId doesn't exist",
        HttpStatus.NOT_FOUND,
      );
    }
    throw new HttpException('id is invalid (not uuid)', HttpStatus.BAD_REQUEST);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    if (isValidId(id)) {
      const album = this.albumService.remove(id);

      if (album) return album;

      throw new HttpException(
        "record with id === albumId doesn't exist",
        HttpStatus.NOT_FOUND,
      );
    }
    throw new HttpException('id is invalid (not uuid)', HttpStatus.BAD_REQUEST);
  }
}
