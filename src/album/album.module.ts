import { forwardRef, Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { TrackModule } from 'src/track/track.module';
import { FavoriteModule } from 'src/favorite/favorite.module';
import { AlbumEntity } from './entities/album.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, AuthService, JwtService, UserService],
  imports: [
    TypeOrmModule.forFeature([UserEntity, AlbumEntity]),
    forwardRef(() => FavoriteModule),
    forwardRef(() => TrackModule),
  ],
  exports: [AlbumService],
})
export class AlbumModule {}
