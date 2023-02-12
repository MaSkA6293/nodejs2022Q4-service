import { forwardRef, Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { TrackModule } from 'src/track/track.module';
import { FavoriteModule } from 'src/favorite/favorite.module';
import { ArtistEntity } from './entities/artist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  imports: [
    forwardRef(() => FavoriteModule),
    forwardRef(() => TrackModule),
    TypeOrmModule.forFeature([ArtistEntity]),
  ],
  exports: [ArtistService],
})
export class ArtistModule {}
