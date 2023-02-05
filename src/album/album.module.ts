import { forwardRef, Module } from '@nestjs/common';
import { InMemoryAlbumStore } from './store/album.store';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { TrackModule } from 'src/track/track.module';
import { FavoriteModule } from 'src/favorite/favorite.module';

@Module({
  controllers: [AlbumController],
  providers: [
    AlbumService,
    {
      provide: 'AlbumStore',
      useClass: InMemoryAlbumStore,
    },
  ],
  imports: [forwardRef(() => FavoriteModule), forwardRef(() => TrackModule)],
  exports: [AlbumService],
})
export class AlbumModule {}
