import { Module } from '@nestjs/common';
import { InMemoryArtistStore } from './store/artist.store';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';

@Module({
  controllers: [ArtistController],
  providers: [
    ArtistService,
    {
      provide: 'ArtistStore',
      useClass: InMemoryArtistStore,
    },
  ],
})
export class ArtistModule {}
