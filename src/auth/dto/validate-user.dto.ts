import { IsString, IsNotEmpty } from 'class-validator';

export class ValidateUserDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  login: string;
}
