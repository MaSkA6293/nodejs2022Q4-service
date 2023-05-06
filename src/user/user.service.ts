import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

const { BCRYPT_SALT } = process.env;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = await new UserEntity(createUserDto).create(createUserDto);

    return await this.userRepository.save(user);
  }

  async findAll() {
    const users = await this.userRepository.find();

    return users;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) return undefined;

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) return { data: undefined, error: HttpStatus.NOT_FOUND };

    const isValidPassword = await user.validatePassword(
      updateUserDto.oldPassword,
    );

    if (!isValidPassword)
      return { data: undefined, error: HttpStatus.FORBIDDEN };

    const update: UserEntity = await user.update();

    update.password = await bcrypt.hash(update.password, Number(BCRYPT_SALT));

    const result = await this.userRepository.update(user.id, update);

    if (result.affected) return { data: update, error: undefined };

    return { data: undefined, error: HttpStatus.INTERNAL_SERVER_ERROR };
  }

  async remove(id: string) {
    await this.userRepository.delete(id);
  }

  async findOneByLogin(userData: CreateUserDto): Promise<boolean> {
    const { login, password } = userData;
    const user = await this.userRepository.findOneBy({ login });
    if (!user) return false;

    const isValidPassword = await user.validatePassword(password);

    if (isValidPassword) return true;

    return false;
  }
}
