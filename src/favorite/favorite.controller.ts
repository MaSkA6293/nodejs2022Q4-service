import { Controller, Get, Post, Param, Delete, HttpCode } from '@nestjs/common';
import { FavoriteService } from './favorite.service';

@Controller('favs')
export class FavoriteController {
  constructor(private readonly FavoriteService: FavoriteService) {}

  @Get()
  findAll() {
    return this.FavoriteService.findAll();
  }

  @Post('track/:id')
  @HttpCode(201)
  addTrack(@Param('id') id: string) {
    return this.FavoriteService.addTrack(id);
  }

  @Post('album/:id')
  @HttpCode(201)
  addAlbum(@Param('id') id: string) {
    return this.FavoriteService.addAlbum(id);
  }

  @Post('artist/:id')
  @HttpCode(201)
  addArtist(@Param('id') id: string) {
    return this.FavoriteService.addArtist(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeAlbum(@Param('id') id: string) {
    this.FavoriteService.removeAlbum(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeTrack(@Param('id') id: string) {
    this.FavoriteService.removeTrack(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeArtist(@Param('id') id: string) {
    this.FavoriteService.removeArtist(id);
  }
}
