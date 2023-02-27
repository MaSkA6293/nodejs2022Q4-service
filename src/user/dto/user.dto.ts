import { OmitType } from '@nestjs/mapped-types';
import { UserEntity } from '../entities/user.entity';

export class UserDto extends OmitType(UserEntity, ['password']) {}
