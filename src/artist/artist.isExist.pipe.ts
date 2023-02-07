import { PipeTransform, Injectable } from '@nestjs/common';
import { entity } from 'src/interfaces';
import { notFoundError } from 'src/utils';
import { ArtistService } from './artist.service';
import { ArtistEntity } from './entities/artist.entity';

@Injectable()
export class ArtistIsExistPipe implements PipeTransform<string, ArtistEntity> {
  constructor(private readonly artistService: ArtistService) {}

  transform(uuid: string): ArtistEntity {
    const artist = this.artistService.findOne(uuid);

    if (!artist) notFoundError(entity.artist);

    return artist;
  }
}
