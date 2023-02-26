import { forwardRef, Module } from '@nestjs/common';
import { FavoriteModule } from 'src/favorite/favorite.module';
import { TrackEntity } from './entities/track.entity';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { AuthService } from 'src/auth/auth.service';

@Module({
  controllers: [TrackController],
  providers: [TrackService, AuthService],
  imports: [
    forwardRef(() => FavoriteModule),
    TypeOrmModule.forFeature([TrackEntity, UserEntity]),
  ],
  exports: [TrackService],
})
export class TrackModule {}
