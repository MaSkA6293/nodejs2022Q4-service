import { HttpStatus } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';

export interface UserUpdate {
  data: undefined | UserDto;
  error: HttpStatus;
}
