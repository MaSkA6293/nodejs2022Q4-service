import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty({ message: 'request body does not contain required fields' })
  @IsString()
  oldPassword: string;

  @IsString()
  @IsNotEmpty({ message: 'request body does not contain required fields' })
  newPassword: string;
}
