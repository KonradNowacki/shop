import { EmailString } from '@shop/common-utils';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserExistsDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email?: EmailString;
}
