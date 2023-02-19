import { forwardRef, Module } from '@nestjs/common';
import { FavoriteModule } from 'src/favorite/favorite.module';
import { TrackEntity } from './entities/track.entity';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [TrackController],
  providers: [TrackService],
  imports: [
    forwardRef(() => FavoriteModule),
    TypeOrmModule.forFeature([TrackEntity]),
  ],
  exports: [TrackService],
})
export class TrackModule {}
