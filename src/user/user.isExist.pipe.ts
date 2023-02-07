import { PipeTransform, Injectable } from '@nestjs/common';
import { entity } from 'src/interfaces';
import { notFoundError } from 'src/utils';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Injectable()
export class UserIsExistPipe implements PipeTransform<string, UserDto> {
  constructor(private readonly userService: UserService) {}

  transform(uuid: string): UserDto {
    const user = this.userService.findOne(uuid);

    if (!user) notFoundError(entity.user);

    return user;
  }
}
