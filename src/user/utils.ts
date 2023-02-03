import { UserDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import { validate as uuidValidate } from 'uuid';
import { UserStore } from './interfaces/user-storage.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';

export const omitPassword = (user: UserEntity): UserDto => {
  const userCopy = Object.assign({}, user);
  delete userCopy.password;
  return userCopy;
};

export const checkId = (id: string) => {
  const checkId = uuidValidate(id);

  if (!checkId)
    throw new HttpException('id is invalid (not uuid)', HttpStatus.BAD_REQUEST);
};

export const checkUser = (
  storage: UserStore,
  id: string,
): UserEntity | undefined => {
  const user = storage.findOne(id);
  if (!user)
    throw new HttpException(
      "record with id === userId doesn't exist",
      HttpStatus.NOT_FOUND,
    );
  return user;
};

export const checkPassword = (
  user: UserEntity,
  updateUserDto: UpdateUserDto,
) => {
  if (user.password !== updateUserDto.oldPassword)
    throw new HttpException('oldPassword is wrong', HttpStatus.FORBIDDEN);
};

export const getUpdatedUserEntity = (
  user: UserEntity,
  updateUserDto: UpdateUserDto,
): UserEntity => {
  const update: UserEntity = {
    ...user,
    password: updateUserDto.newPassword,
    version: user.version + 1,
    updatedAt: new Date().getTime(),
  };
  return update;
};

export const createRecord = (createUserDto: CreateUserDto) => {
  const record = {
    ...createUserDto,
    id: uuidv4(),
    version: 1,
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
  };
  return record;
};
