import { Module } from '@nestjs/common';
import { InMemoryArtistStore } from './store/artist.store';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [ArtistController],
  providers: [
    ArtistService,
    {
      provide: 'ArtistStore',
      useClass: InMemoryArtistStore,
    },
  ],
  imports: [UserModule],
})
export class ArtistModule {}
