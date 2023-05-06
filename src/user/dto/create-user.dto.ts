import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'request body does not contain required fields' })
  @IsString()
  login: string;

  @IsString()
  @IsNotEmpty({ message: 'request body does not contain required fields' })
  password: string;
}
