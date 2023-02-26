import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { AuthService } from 'src/auth/auth.service';

dotenv.config();

const { JWT_SECRET } = process.env;

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const token: string = context.switchToHttp().getRequest()
      .headers.authorization;

    if (!token) throw new UnauthorizedException();
    try {
      const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET) as {
        id: string;
        login: string;
      };

      if (!decoded) throw new UnauthorizedException();

      const { id, login } = decoded;

      const isValidUser = this.authService.validateUser({ id, login });

      if (isValidUser) return true;

      throw new UnauthorizedException();
    } catch {
      throw new UnauthorizedException();
    }
  }
}
