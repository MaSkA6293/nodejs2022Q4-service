import { UserEntity } from 'src/user/entities/user.entity';

export interface TokenPayload {
  userId: string;
  login: string;
  iat?: number;
  exp?: number;
}

export interface RequestExtendedWithUser extends Request {
  user: UserEntity;
}

export interface LoginProps {
  userId: string;
  login: string;
}
