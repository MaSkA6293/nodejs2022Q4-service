import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserStore } from './interfaces/user-storage.interface';
import { HttpStatus } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import {
  omitPassword,
  getUpdatedUserEntity,
  createRecord,
  validatePassword,
} from './utils';
import { UserUpdate } from './interfaces/user-update.interface';

@Injectable()
export class UserService {
  constructor(@Inject('UserStore') private storage: UserStore) {}
  create(createUserDto: CreateUserDto): UserDto {
    const record = createRecord(createUserDto);

    const user = this.storage.create(record);

    return omitPassword(user);
  }

  findAll(): UserDto[] | [] {
    return this.storage.findAll().map((el) => omitPassword(el));
  }

  findOne(id: string): UserDto | undefined {
    const user = this.storage.findOne(id);

    if (!user) return undefined;

    return omitPassword(user);
  }

  update(id: string, updateUserDto: UpdateUserDto): UserUpdate {
    const user = this.storage.findOne(id);

    if (!user) return { data: undefined, error: HttpStatus.NOT_FOUND };

    const isPasswordValid = validatePassword(user, updateUserDto);
    if (!isPasswordValid)
      return { data: undefined, error: HttpStatus.FORBIDDEN };

    const update = getUpdatedUserEntity(user, updateUserDto);

    const updatedUser = this.storage.update(id, update);

    return { data: omitPassword(updatedUser), error: undefined };
  }

  remove(id: string): boolean {
    const user = this.storage.findOne(id);

    if (!user) return false;

    this.storage.remove(id);

    return true;
  }
}
