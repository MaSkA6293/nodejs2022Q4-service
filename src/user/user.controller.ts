import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { invalidIdBadRequest, isValidId, notFoundError } from 'src/utils';
import { HttpException, HttpStatus } from '@nestjs/common';
import { entity } from 'src/interfaces';
import { UserUpdate } from './interfaces/user-update.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): UserDto | HttpException {
    if (!isValidId(id)) invalidIdBadRequest();

    const user = this.userService.findOne(id);

    if (!user) notFoundError(entity.user);

    return user;
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): UserDto {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): UserDto | HttpException {
    if (!isValidId(id)) invalidIdBadRequest();

    const result: UserUpdate = this.userService.update(id, updateUserDto);

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

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string): void {
    if (!isValidId(id)) invalidIdBadRequest();

    const result = this.userService.remove(id);

    if (!result) notFoundError(entity.user);
  }
}
