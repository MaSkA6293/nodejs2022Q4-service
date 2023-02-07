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
import { UserDto } from './dto/user.dto';
import { notFoundError } from 'src/utils';
import { HttpException, HttpStatus } from '@nestjs/common';
import { entity } from 'src/interfaces';
import { UserUpdate } from './interfaces/user-update.interface';
import { UserIsExistPipe } from './user.isExist.pipe';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid', ParseUUIDPipe, UserIsExistPipe) user: UserDto) {
    return user;
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): UserDto {
    return this.userService.create(createUserDto);
  }

  @Put(':uuid')
  update(
    @Param('uuid', ParseUUIDPipe, UserIsExistPipe) user: UserDto,
    @Body() updateUserDto: UpdateUserDto,
  ): UserDto | HttpException {
    const result: UserUpdate = this.userService.update(user.id, updateUserDto);

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
  remove(@Param('uuid', ParseUUIDPipe, UserIsExistPipe) user: UserDto): void {
    this.userService.remove(user.id);
  }
}
