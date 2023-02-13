import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import { invalidIdBadRequest, isValidId, notFoundError } from 'src/utils';
import { FavoriteService } from './favorite.service';
import { HttpStatus } from '@nestjs/common';
import { getMessageSuccess, notFavoriteError } from './utils';
import { entity } from 'src/interfaces';
import { FavoriteEntity } from './entities/favorite.entity';

@Controller('favs')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  async findAll(): Promise<FavoriteEntity> {
    return await this.favoriteService.findAll();
  }

  @Post('track/:uuid')
  @HttpCode(201)
  async addTrack(@Param('uuid', ParseUUIDPipe) id: string): Promise<{
    message: string;
  }> {
    const result = await this.favoriteService.addTrack(id);

    if (!result) notFoundError(entity.track, HttpStatus.UNPROCESSABLE_ENTITY);

    return {
      message: getMessageSuccess(entity.track),
    };
  }

  @Post('album/:uuid')
  @HttpCode(201)
  async addAlbum(@Param('uuid', ParseUUIDPipe) id: string): Promise<{
    message: string;
  }> {
    const result = await this.favoriteService.addAlbum(id);

    if (!result) notFoundError(entity.album, HttpStatus.UNPROCESSABLE_ENTITY);

    return {
      message: getMessageSuccess(entity.album),
    };
  }

  @Post('artist/:uuid')
  @HttpCode(201)
  async addArtist(@Param('uuid', ParseUUIDPipe) id: string): Promise<{
    message: string;
  }> {
    if (!isValidId(id)) invalidIdBadRequest();

    const result = await this.favoriteService.addArtist(id);

    if (!result) notFoundError(entity.artist, HttpStatus.UNPROCESSABLE_ENTITY);

    return {
      message: getMessageSuccess(entity.artist),
    };
  }

  @Delete('album/:uuid')
  @HttpCode(204)
  async removeAlbum(@Param('uuid', ParseUUIDPipe) id: string): Promise<void> {
    if (!isValidId(id)) invalidIdBadRequest();

    const result = await this.favoriteService.removeAlbum(id);

    if (!result) notFavoriteError(entity.album);
  }

  @Delete('track/:uuid')
  @HttpCode(204)
  async removeTrack(@Param('uuid', ParseUUIDPipe) id: string): Promise<void> {
    if (!isValidId(id)) invalidIdBadRequest();

    const result = await this.favoriteService.removeTrack(id);

    if (!result) notFavoriteError(entity.track);
  }

  @Delete('artist/:uuid')
  @HttpCode(204)
  async removeArtist(@Param('uuid', ParseUUIDPipe) id: string): Promise<void> {
    if (!isValidId(id)) invalidIdBadRequest();

    const result = await this.favoriteService.removeArtist(id);

    if (!result) notFavoriteError(entity.artist);
  }
}
