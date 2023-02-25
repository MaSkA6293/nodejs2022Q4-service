import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private usersService: UserService,
  ) {}

  @HttpCode(201)
  @Post('/signup')
  async signUp(@Body() signUpDto: CreateUserDto) {
    const user = await this.usersService.create(signUpDto);
    if (user) {
      return { message: 'successfully signedUp' };
    }
  }
}
