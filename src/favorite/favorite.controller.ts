import { Controller, Get, Post, Param, Delete, HttpCode } from '@nestjs/common';
import { isValidId } from 'src/utils';
import { FavoriteService } from './favorite.service';
import { HttpException, HttpStatus } from '@nestjs/common';

@Controller('favs')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  findAll() {
    return this.favoriteService.findAll();
  }

  @Post('track/:id')
  @HttpCode(201)
  addTrack(@Param('id') id: string) {
    if (isValidId(id)) {
      const result = this.favoriteService.addTrack(id);
      if (result) {
        return {
          message:
            'track with id === trackId exists, and was successfully added to favorites',
        };
      }
      throw new HttpException(
        "record with id === trackId doesn't exist",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    throw new HttpException('id is invalid (not uuid)', HttpStatus.BAD_REQUEST);
  }

  @Post('album/:id')
  @HttpCode(201)
  addAlbum(@Param('id') id: string) {
    if (isValidId(id)) {
      const result = this.favoriteService.addAlbum(id);
      if (result) {
        return {
          message:
            'track with id === albumId exists, and was successfully added to favorites',
        };
      }
      throw new HttpException(
        "record with id === albumId doesn't exist",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    throw new HttpException('id is invalid (not uuid)', HttpStatus.BAD_REQUEST);
  }

  @Post('artist/:id')
  @HttpCode(201)
  addArtist(@Param('id') id: string) {
    if (isValidId(id)) {
      const result = this.favoriteService.addArtist(id);
      if (result) {
        return {
          message:
            'track with id === artistId exists, and was successfully added to favorites',
        };
      }
      throw new HttpException(
        "record with id === artistId doesn't exist",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    throw new HttpException('id is invalid (not uuid)', HttpStatus.BAD_REQUEST);
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeAlbum(@Param('id') id: string) {
    if (isValidId(id)) {
      const result = this.favoriteService.removeAlbum(id);

      if (result) return;

      throw new HttpException(
        `corresponding album is not favorite`,
        HttpStatus.NOT_FOUND,
      );
    }
    throw new HttpException('id is invalid (not uuid)', HttpStatus.BAD_REQUEST);
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeTrack(@Param('id') id: string) {
    if (isValidId(id)) {
      const result = this.favoriteService.removeTrack(id);

      if (result) return;

      throw new HttpException(
        `corresponding track is not favorite`,
        HttpStatus.NOT_FOUND,
      );
    }
    throw new HttpException('id is invalid (not uuid)', HttpStatus.BAD_REQUEST);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeArtist(@Param('id') id: string) {
    if (isValidId(id)) {
      const result = this.favoriteService.removeArtist(id);

      if (result) return;

      throw new HttpException(
        `corresponding artist is not favorite`,
        HttpStatus.NOT_FOUND,
      );
    }
    throw new HttpException('id is invalid (not uuid)', HttpStatus.BAD_REQUEST);
  }
}
