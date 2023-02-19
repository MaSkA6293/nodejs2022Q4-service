import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UpdateUserDto } from '../dto/update-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from '../dto/create-user.dto';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column()
  version: number;

  @Column()
  createdAt: number;

  @Column()
  updatedAt: number;

  toResponse() {
    const { id, login, version, createdAt, updatedAt } = this;
    return { id, login, version, createdAt, updatedAt };
  }

  update(updateUserDto: UpdateUserDto) {
    this.password = updateUserDto.newPassword;
    this.version = this.version + 1;
    this.updatedAt = new Date().getTime();
    return this;
  }

  create(createUserDto: CreateUserDto) {
    this.id = uuidv4();
    this.login = createUserDto.login;
    this.password = createUserDto.password;
    this.version = 1;
    this.createdAt = new Date().getTime();
    this.updatedAt = new Date().getTime();
    return this;
  }

  validatePassword(updateUserDto: UpdateUserDto) {
    if (this.password === updateUserDto.oldPassword) return true;
    return false;
  }
}
