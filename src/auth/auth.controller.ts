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
import { RefreshTokenDto } from './dto/refresh-token.dto';

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
    const user = await this.authService.getUserByCredentials(signUpDto);

    if (user) {
      const { id, login } = user;

      const token = this.authService.getJwtToken(id, login);
      const { secretId, refreshToken } =
        this.authService.getRefreshToken(token);

      const saveResult = await this.authService.saveSecretId(user, secretId);
      if (saveResult) return { accessToken: token, refreshToken };
    }
    throw new ForbiddenException();
  }

  @HttpCode(200)
  @Post('refresh')
  async refresh(@Body() refreshData: RefreshTokenDto) {
    const isRefreshValid = await this.authService.checkRefreshToken(
      refreshData.refreshToken,
    );

    if (isRefreshValid) {
      const secretIdRefreshToken = this.authService.getSecretId(
        refreshData.refreshToken,
      );
      if (!secretIdRefreshToken) throw new ForbiddenException();
      const user = await this.authService.getUserBySecretId(
        secretIdRefreshToken,
      );

      const newToken = this.authService.getJwtToken(user.id, user.login);

      const { secretId, refreshToken } =
        this.authService.getRefreshToken(newToken);

      const saveResult = await this.authService.saveSecretId(user, secretId);

      if (saveResult) return { newToken, refreshToken };
    }
    throw new ForbiddenException();
  }
}
