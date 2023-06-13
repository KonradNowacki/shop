import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';
import { EmailString } from '@shop/common-utils';

export class UserCreateDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email?: EmailString;

  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minSymbols: 1,
    minNumbers: 1,
    minUppercase: 1,
  })
  readonly password?: string;
}
