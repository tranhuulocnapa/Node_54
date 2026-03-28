import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail(undefined, { message: 'email sai rồi' })
  email: string;
  @IsNotEmpty()
  password: string;
}
