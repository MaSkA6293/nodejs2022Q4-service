import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserStore } from './interfaces/user-storage.interface';
import { UserEntity } from './entities/user.entity';

import { UserDto } from './dto/user.dto';
import {
  checkId,
  checkPassword,
  checkUser,
  omitPassword,
  getUpdatedUserEntity,
  createRecord,
} from './utils';

@Injectable()
export class UserService {
  constructor(@Inject('UserStore') private storage: UserStore) {}
  create(createUserDto: CreateUserDto): UserDto {
    const record = createRecord(createUserDto);
    const user = this.storage.create(record);
    return omitPassword(user);
  }

  findAll() {
    return this.storage.findAll();
  }

  findOne(id: string) {
    checkId(id);
    return checkUser(this.storage, id);
  }

  update(id: string, updateUserDto: UpdateUserDto): UserDto | undefined {
    checkId(id);

    const user: UserEntity | undefined = checkUser(this.storage, id);

    checkPassword(user, updateUserDto);

    const update = getUpdatedUserEntity(user, updateUserDto);

    const updatedUser = this.storage.update(id, update);

    return omitPassword(updatedUser);
  }

  remove(id: string) {
    checkId(id);
    checkUser(this.storage, id);
    this.storage.remove(id);
  }
}
