import {
  BadRequestException,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  canActivate(context: ExecutionContext) {
    const { login, password } = context.switchToHttp().getRequest().body;
    if (
      login &&
      password &&
      typeof login === 'string' &&
      typeof password === 'string'
    )
      return super.canActivate(context);

    throw new BadRequestException([
      'Fields login and password must be strings',
      'Fields login and password must not be empty or null',
    ]);
  }

  handleRequest(err, user) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
