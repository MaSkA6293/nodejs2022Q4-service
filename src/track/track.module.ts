import { Module } from '@nestjs/common';
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
  exports: [TrackService],
})
export class TrackModule {}
