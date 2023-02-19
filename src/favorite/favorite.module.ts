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

@Module({
  controllers: [FavoriteController],
  providers: [FavoriteService],
  imports: [
    TypeOrmModule.forFeature([
      FavoriteAlbumEntity,
      FavoriteArtistEntity,
      FavoriteTrackEntity,
    ]),
    forwardRef(() => TrackModule),
    forwardRef(() => ArtistModule),
    forwardRef(() => AlbumModule),
  ],
  exports: [FavoriteService],
})
export class FavoriteModule {}
