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
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { notFoundError } from 'src/utils';
import { HttpException, HttpStatus } from '@nestjs/common';
import { entity } from 'src/interfaces';
import { UserIsExistPipe } from './user.isExist.pipe';
import { UserEntity } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':uuid')
  findOne(@Param('uuid', ParseUUIDPipe, UserIsExistPipe) user: UserEntity) {
    return user;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
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
  async remove(
    @Param('uuid', ParseUUIDPipe, UserIsExistPipe) user: UserEntity,
  ): Promise<void> {
    await this.userService.remove(user.id);
  }
}
