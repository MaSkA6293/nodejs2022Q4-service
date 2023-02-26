import { forwardRef, Module } from '@nestjs/common';
import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';
import { TrackModule } from 'src/track/track.module';
import { ArtistModule } from 'src/artist/artist.module';
import { AlbumModule } from 'src/album/album.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteAlbumEntity } from './entities/favoriteAlbum.entity';
import { FavoriteArtistEntity } from './entities/favoriteArtist.entity';
import { FavoriteTrackEntity } from './entities/favoriteTrack.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { AuthService } from 'src/auth/auth.service';

@Module({
  controllers: [FavoriteController],
  providers: [FavoriteService, AuthService],
  imports: [
    TypeOrmModule.forFeature([
      FavoriteAlbumEntity,
      FavoriteArtistEntity,
      FavoriteTrackEntity,
      UserEntity,
    ]),
    forwardRef(() => TrackModule),
    forwardRef(() => ArtistModule),
    forwardRef(() => AlbumModule),
  ],
  exports: [FavoriteService],
})
export class FavoriteModule {}
