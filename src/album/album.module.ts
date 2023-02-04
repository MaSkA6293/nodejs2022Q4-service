import { Module } from '@nestjs/common';
import { InMemoryAlbumStore } from './store/album.store';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { TrackModule } from 'src/track/track.module';

@Module({
  controllers: [AlbumController],
  providers: [
    AlbumService,
    {
      provide: 'AlbumStore',
      useClass: InMemoryAlbumStore,
    },
  ],
  imports: [TrackModule],
})
export class AlbumModule {}
