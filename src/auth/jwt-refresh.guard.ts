import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { TokenPayload } from './interfaces';

@Injectable()
export default class JwtRefreshGuard extends AuthGuard('jwt-refresh-token') {
  constructor(private readonly jwtService: JwtService) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const { refreshToken } = context.switchToHttp().getRequest().body;

    if (!refreshToken)
      throw new UnauthorizedException(
        'dto is invalid (no refreshToken in body',
      );
    try {
      const decodedJwtAccessToken: TokenPayload = this.jwtService.decode(
        refreshToken,
      ) as TokenPayload;

      const exp = decodedJwtAccessToken.exp;
      if (exp < Date.now() / 1000) {
        throw new ForbiddenException('Refresh token is expired');
      }

      return super.canActivate(context);
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }

  handleRequest(err, user) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
