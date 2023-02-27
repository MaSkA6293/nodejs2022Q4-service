import { PipeTransform, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { entity } from 'src/interfaces';
import { notFoundError } from 'src/utils';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserIsExistPipe
  implements PipeTransform<string, Promise<UserEntity>>
{
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async transform(uuid: string) {
    const user = await this.userRepository.findOne({ where: { id: uuid } });

    if (!user) notFoundError(entity.user);

    return user;
  }
}
