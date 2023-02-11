import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { notFoundError } from 'src/utils';
import { HttpException, HttpStatus } from '@nestjs/common';
import { entity } from 'src/interfaces';
import { UserIsExistPipe } from './user.isExist.pipe';
import { UserEntity } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid', ParseUUIDPipe, UserIsExistPipe) user: UserEntity) {
    return user;
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Put(':uuid')
  async update(
    @Param('uuid', ParseUUIDPipe, UserIsExistPipe) user: UserEntity,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const result = await this.userService.update(user.id, updateUserDto);

    if (result.data) return result.data;

    switch (result.error) {
      case HttpStatus.NOT_FOUND: {
        notFoundError(entity.user);
      }
      case HttpStatus.FORBIDDEN: {
        throw new HttpException('oldPassword is wrong', HttpStatus.FORBIDDEN);
      }
    }
  }

  @Delete(':uuid')
  @HttpCode(204)
  remove(
    @Param('uuid', ParseUUIDPipe, UserIsExistPipe) user: UserEntity,
  ): void {
    this.userService.remove(user.id);
  }
}
