import {
  Controller,
  Post,
  Body,
  HttpCode,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { RequestExtendedWithUser } from './interfaces';
import JwtRefreshGuard from './jwt-refresh.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @HttpCode(201)
  @Post('signup')
  async signUp(@Body() signUpDto: CreateUserDto) {
    const user = await this.userService.create(signUpDto);
    if (user) {
      return user;
    }
  }

  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('login')
  async login(@Request() req: RequestExtendedWithUser) {
    const { id, login } = req.user;

    return this.authService.login({
      userId: id,
      login: login,
    });
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @HttpCode(200)
  async refresh(@Request() req: RequestExtendedWithUser) {
    const { id, login } = req.user;

    return this.authService.login({
      userId: id,
      login: login,
    });
  }
}
