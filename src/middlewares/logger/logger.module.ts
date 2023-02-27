import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AlbumController } from 'src/album/album.controller';
import { ArtistController } from 'src/artist/artist.controller';
import { FavoriteController } from 'src/favorite/favorite.controller';
import { TrackController } from 'src/track/track.controller';
import { UserController } from 'src/user/user.controller';
import { LoggerMiddleware } from './logger.service';

@Module({})
export class AppLogger implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(
        UserController,
        TrackController,
        ArtistController,
        AlbumController,
        FavoriteController,
      );
  }
}
