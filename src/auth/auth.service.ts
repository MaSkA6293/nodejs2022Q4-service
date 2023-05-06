import { ForbiddenException, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginProps } from './interfaces';

dotenv.config();

const { JWT_REFRESH_SECRET, JWT_SECRET, TOKEN_EXPIRE, REFRESH_TOKEN_EXPIRE } =
  process.env;

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async checkRefreshToken(refreshToken: string) {
    try {
      const secretId = this.getSecretId(refreshToken);

      if (!secretId) return false;

      const user = await this.userRepository.findOneBy({
        refreshToken: secretId,
      });

      if (user) return true;

      return false;
    } catch {
      return false;
    }
  }

  getSecretId(refreshToken: string) {
    try {
      const { secretId } = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as {
        secretId: string;
      };
      if (secretId) return secretId;
    } catch {
      return false;
    }
  }

  async getUserBySecretId(refreshToken: string): Promise<UserEntity> {
    const { secretId } = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as {
      secretId: string;
    };

    const user = await this.userRepository.findOneBy({
      refreshToken: secretId,
    });

    return user;
  }

  async getUserByCredentials(
    userData: CreateUserDto,
  ): Promise<UserEntity | undefined> {
    const { login, password } = userData;

    const user = await this.userRepository.findOneBy({ login });

    if (!user) return undefined;

    const isValidPassword = await user.validatePassword(password);

    if (isValidPassword) return user;

    return undefined;
  }

  async login(payload: LoginProps) {
    const accessToken = this.jwtService.sign(payload, {
      secret: JWT_SECRET,
      expiresIn: TOKEN_EXPIRE,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: JWT_REFRESH_SECRET,
      expiresIn: REFRESH_TOKEN_EXPIRE,
    });

    await this.saveSecretId(payload.userId, refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveSecretId(id: string, secretId: string) {
    const user = await this.userRepository.findOneBy({ id });

    await this.userRepository.update(user.id, { refreshToken: secretId });
  }

  async validateUser(userData: CreateUserDto): Promise<UserEntity | undefined> {
    const { login, password } = userData;

    const user = await this.userRepository.findOneBy({ login });

    if (!user) return undefined;

    const isValidPassword = await user.validatePassword(password);

    if (isValidPassword) return user;

    return undefined;
  }

  async getUserRefresh(refreshToken: string, id: string) {
    const user = await this.userRepository.findOneBy({ id });

    if (refreshToken === user.refreshToken) {
      return user;
    } else {
      throw new ForbiddenException('Refresh token is invalid');
    }
  }
}
