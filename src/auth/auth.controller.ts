import {
  Controller,
  Post,
  Body,
  HttpCode,
  ForbiddenException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RequestExtendedWithUser } from './interfaces';
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
      return { message: 'successfully signedUp' };
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
        refreshData.refreshToken,
      );
      const { id, login } = user;

      const newToken = this.authService.getJwtToken({ id, login });

      const { secretId, refreshToken } =
        this.authService.getRefreshToken(newToken);

      const saveResult = await this.authService.saveSecretId(user, secretId);

      if (saveResult) return { newToken, refreshToken };
    }
    throw new ForbiddenException();
  }
}
