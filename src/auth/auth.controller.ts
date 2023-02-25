import {
  Controller,
  Post,
  Body,
  HttpCode,
  ForbiddenException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UserService,
  ) {}

  @HttpCode(201)
  @Post('signup')
  async signUp(@Body() signUpDto: CreateUserDto) {
    const user = await this.userService.create(signUpDto);
    if (user) {
      return { message: 'successfully signedUp' };
    }
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() signUpDto: CreateUserDto) {
    const user = await this.userService.getUserByCredentials(signUpDto);

    if (user) {
      const { id, login } = user;

      const token = this.authService.getJwtToken(id, login);
      const { secretId, refreshToken } =
        this.authService.getRefreshToken(token);

      const saveResult = await this.userService.saveSecretId(user, secretId);
      if (saveResult) return { token, refreshToken };
    }
    throw new ForbiddenException();
  }
}
