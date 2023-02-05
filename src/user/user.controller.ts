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
import { isValidId } from 'src/utils';
import { HttpException, HttpStatus } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (isValidId(id)) {
      const user = this.userService.findOne(id);
      if (user) return user;
      throw new HttpException(
        "record with id === userId doesn't exist",
        HttpStatus.NOT_FOUND,
      );
    }
    throw new HttpException('id is invalid (not uuid)', HttpStatus.BAD_REQUEST);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): UserDto {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): UserDto {
    if (isValidId(id)) {
      const result = this.userService.update(id, updateUserDto);
      if (result.data) return result.data;

      switch (result.error) {
        case HttpStatus.NOT_FOUND: {
          throw new HttpException(
            "record with id === userId doesn't exist",
            HttpStatus.NOT_FOUND,
          );
        }
        case HttpStatus.FORBIDDEN: {
          throw new HttpException('oldPassword is wrong', HttpStatus.FORBIDDEN);
        }
      }
    }
    throw new HttpException('id is invalid (not uuid)', HttpStatus.BAD_REQUEST);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    if (isValidId(id)) {
      const result = this.userService.remove(id);

      if (result) return;

      throw new HttpException(
        "record with id === userId doesn't exist",
        HttpStatus.NOT_FOUND,
      );
    }
    throw new HttpException('id is invalid (not uuid)', HttpStatus.BAD_REQUEST);
  }
}
