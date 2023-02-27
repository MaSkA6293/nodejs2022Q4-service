import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

import * as dotenv from 'dotenv';
import { TokenPayload } from './interfaces';

dotenv.config();

const { JWT_REFRESH_SECRET } = process.env;

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request.body?.refreshToken;
        },
      ]),
      secretOrKey: JWT_REFRESH_SECRET,
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: TokenPayload) {
    const refreshToken = request.body?.refreshToken;
    return this.authService.getUserRefresh(refreshToken, payload.userId);
  }
}
