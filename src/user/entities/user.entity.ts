import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';

const { BCRYPT_SALT } = process.env;

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  version: number;

  @Column()
  createdAt: number;

  @Column()
  updatedAt: number;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, Number(BCRYPT_SALT));
  }

  constructor(partial: Partial<UserEntity | CreateUserDto>) {
    Object.assign(this, partial);
  }

  async update() {
    this.version = this.version + 1;
    this.updatedAt = new Date().getTime();
    return this;
  }

  async create(createUserDto: CreateUserDto) {
    this.id = uuidv4();
    this.login = createUserDto.login;
    this.password = createUserDto.password;
    this.version = 1;
    this.createdAt = new Date().getTime();
    this.updatedAt = new Date().getTime();
    return this;
  }

  async validatePassword(password: string): Promise<boolean> {
    const isPasswordCorrect = await bcrypt.compare(password, this.password);

    return isPasswordCorrect;
  }
}
