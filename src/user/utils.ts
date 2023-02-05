import { UserDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';

export const omitPassword = (user: UserEntity): UserDto => {
  const userCopy = Object.assign({}, user);
  delete userCopy.password;
  return userCopy;
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

export const validatePassword = (
  user: UserEntity,
  updateUserDto: UpdateUserDto,
): boolean => {
  if (user.password === updateUserDto.oldPassword) return true;
  return false;
};
