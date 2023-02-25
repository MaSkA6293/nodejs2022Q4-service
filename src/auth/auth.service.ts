import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import * as dotenv from 'dotenv';

dotenv.config();

const { REFRESH_TOKEN_EXPIRE, TOKEN_EXPIRE, JWT_SECRET, JWT_REFRESH_SECRET } =
  process.env;

@Injectable()
export class AuthService {
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
}
