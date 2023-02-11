import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = new UserEntity().create(createUserDto);

    const createdUser = this.userRepository.create(user);

    return (await this.userRepository.save(createdUser)).toResponse();
  }

  async findAll() {
    const users = await this.userRepository.find();

    return users.map((user) => user.toResponse());
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) return undefined;

    return user.toResponse();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) return { data: undefined, error: HttpStatus.NOT_FOUND };

    if (!user.validatePassword(updateUserDto))
      return { data: undefined, error: HttpStatus.FORBIDDEN };

    const update: UserEntity = user.update(updateUserDto);

    const result = await this.userRepository.update(user.id, update);

    if (result.affected) return { data: update.toResponse(), error: undefined };

    return { data: undefined, error: HttpStatus.INTERNAL_SERVER_ERROR };
  }

  async remove(id: string) {
    await this.userRepository.delete(id);
  }
}
