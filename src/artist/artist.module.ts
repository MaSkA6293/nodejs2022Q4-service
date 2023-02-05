import { forwardRef, Module } from '@nestjs/common';
import { InMemoryArtistStore } from './store/artist.store';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { TrackModule } from 'src/track/track.module';
import { FavoriteModule } from 'src/favorite/favorite.module';

@Module({
  controllers: [ArtistController],
  providers: [
    ArtistService,
    {
      provide: 'ArtistStore',
      useClass: InMemoryArtistStore,
    },
  ],
  imports: [forwardRef(() => FavoriteModule), forwardRef(() => TrackModule)],
  exports: [ArtistService],
})
export class ArtistModule {}
