import { forwardRef, Module } from '@nestjs/common';
import { FavoriteModule } from 'src/favorite/favorite.module';
import { InMemoryTrackStore } from './store/track.store';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({
  controllers: [TrackController],
  providers: [
    TrackService,
    {
      provide: 'TrackStore',
      useClass: InMemoryTrackStore,
    },
  ],
  imports: [forwardRef(() => FavoriteModule)],
  exports: [TrackService],
})
export class TrackModule {}
