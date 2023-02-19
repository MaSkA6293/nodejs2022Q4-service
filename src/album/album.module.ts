import { forwardRef, Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { TrackModule } from 'src/track/track.module';
import { FavoriteModule } from 'src/favorite/favorite.module';
import { AlbumEntity } from './entities/album.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService],
  imports: [
    forwardRef(() => FavoriteModule),
    forwardRef(() => TrackModule),
    TypeOrmModule.forFeature([AlbumEntity]),
  ],
  exports: [AlbumService],
})
export class AlbumModule {}
