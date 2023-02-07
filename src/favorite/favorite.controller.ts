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

@Controller('favs')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  findAll() {
    return this.favoriteService.findAll();
  }

  @Post('track/:uuid')
  @HttpCode(201)
  addTrack(@Param('uuid', ParseUUIDPipe) id: string) {
    const result = this.favoriteService.addTrack(id);

    if (!result) notFoundError(entity.track, HttpStatus.UNPROCESSABLE_ENTITY);

    return {
      message: getMessageSuccess(entity.track),
    };
  }

  @Post('album/:uuid')
  @HttpCode(201)
  addAlbum(@Param('uuid', ParseUUIDPipe) id: string) {
    const result = this.favoriteService.addAlbum(id);

    if (!result) notFoundError(entity.album, HttpStatus.UNPROCESSABLE_ENTITY);

    return {
      message: getMessageSuccess(entity.album),
    };
  }

  @Post('artist/:uuid')
  @HttpCode(201)
  addArtist(@Param('uuid', ParseUUIDPipe) id: string) {
    if (!isValidId(id)) invalidIdBadRequest();

    const result = this.favoriteService.addArtist(id);

    if (!result) notFoundError(entity.artist, HttpStatus.UNPROCESSABLE_ENTITY);

    return {
      message: getMessageSuccess(entity.artist),
    };
  }

  @Delete('album/:uuid')
  @HttpCode(204)
  removeAlbum(@Param('uuid', ParseUUIDPipe) id: string) {
    if (!isValidId(id)) invalidIdBadRequest();

    const result = this.favoriteService.removeAlbum(id);

    if (!result) notFavoriteError(entity.album);
  }

  @Delete('track/:uuid')
  @HttpCode(204)
  removeTrack(@Param('uuid', ParseUUIDPipe) id: string) {
    if (!isValidId(id)) invalidIdBadRequest();

    const result = this.favoriteService.removeTrack(id);

    if (!result) notFavoriteError(entity.track);
  }

  @Delete('artist/:uuid')
  @HttpCode(204)
  removeArtist(@Param('uuid', ParseUUIDPipe) id: string) {
    if (!isValidId(id)) invalidIdBadRequest();

    const result = this.favoriteService.removeArtist(id);

    if (!result) notFavoriteError(entity.artist);
  }
}
