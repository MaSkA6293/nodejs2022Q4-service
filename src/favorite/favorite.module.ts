import { forwardRef, Module } from '@nestjs/common';
import { InMemoryFavoriteStore } from './store/favorite.store';
import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';
import { TrackModule } from 'src/track/track.module';
import { ArtistModule } from 'src/artist/artist.module';
import { AlbumModule } from 'src/album/album.module';
import { FavoriteEntity } from './entities/favorite.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [FavoriteController],
  providers: [
    FavoriteService,
    {
      provide: 'FavoriteStore',
      useClass: InMemoryFavoriteStore,
    },
  ],
  imports: [
    TypeOrmModule.forFeature([FavoriteEntity]),
    forwardRef(() => TrackModule),
    forwardRef(() => ArtistModule),
    forwardRef(() => AlbumModule),
  ],
  exports: [FavoriteService],
})
export class FavoriteModule {}
