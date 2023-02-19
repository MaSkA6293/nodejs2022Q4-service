import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AlbumController } from 'src/album/album.controller';
import { AlbumModule } from 'src/album/album.module';
import { ArtistController } from 'src/artist/artist.controller';
import { ArtistModule } from 'src/artist/artist.module';
import { FavoriteController } from 'src/favorite/favorite.controller';
import { FavoriteModule } from 'src/favorite/favorite.module';
import { TrackController } from 'src/track/track.controller';
import { TrackModule } from 'src/track/track.module';
import { UserController } from 'src/user/user.controller';
import { UserModule } from 'src/user/user.module';
import { LoggerMiddleware } from './logger.service';

@Module({
  imports: [UserModule, TrackModule, ArtistModule, AlbumModule, FavoriteModule],
})
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
