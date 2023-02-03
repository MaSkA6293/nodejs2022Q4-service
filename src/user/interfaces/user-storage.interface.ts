import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';

export interface UserStore {
  findOne: (id: string) => UserEntity | undefined;
  findAll: () => UserEntity[];
  create: (params: CreateUserDto) => UserEntity;
  update: (id: string, update: UserEntity) => UserEntity;
  remove: (id: string) => undefined;
}
