import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import * as dotenv from 'dotenv';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ValidateUserDto } from './dto/validate-user.dto';

dotenv.config();

const { REFRESH_TOKEN_EXPIRE, TOKEN_EXPIRE, JWT_SECRET, JWT_REFRESH_SECRET } =
  process.env;

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  getJwtToken(id: string, login: string): string {
    return jwt.sign({ id, login }, JWT_SECRET, {
      expiresIn: TOKEN_EXPIRE,
    });
  }

  getRefreshToken(token: string): { secretId: string; refreshToken: string } {
    const secretId = uuid();
    const refreshToken = jwt.sign({ secretId, token }, JWT_REFRESH_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRE,
    });

    return { secretId, refreshToken };
  }

  async checkRefreshToken(refreshToken: string) {
    try {
      const secretId = this.getSecretId(refreshToken);

      if (!secretId) return false;

      const user = await this.userRepository.findOneBy({ secretId });

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

    const user = await this.userRepository.findOneBy({ secretId });

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

  async saveSecretId(user: UserEntity, id: string): Promise<boolean> {
    user.secretId = id;

    const result = await this.userRepository.update(user.id, user);

    if (result.affected) return true;

    return false;
  }

  async validateUser(userData: ValidateUserDto) {
    const { login, id } = userData;

    const user = await this.userRepository.findOneBy({ login, id });

    if (!user) return false;

    return true;
  }
}
