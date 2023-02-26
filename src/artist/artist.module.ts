import { forwardRef, Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { TrackModule } from 'src/track/track.module';
import { FavoriteModule } from 'src/favorite/favorite.module';
import { ArtistEntity } from './entities/artist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { UserEntity } from 'src/user/entities/user.entity';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, AuthService],
  imports: [
    TypeOrmModule.forFeature([UserEntity, ArtistEntity]),
    forwardRef(() => FavoriteModule),
    forwardRef(() => TrackModule),
  ],
  exports: [ArtistService],
})
export class ArtistModule {}
