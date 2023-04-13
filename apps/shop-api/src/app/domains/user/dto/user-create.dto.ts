import {IsEmail, IsStrongPassword} from "class-validator";

export class UserCreateDto {

  @IsEmail()
  readonly email: string;

  @IsStrongPassword({
    minLength: 8,
    minSymbols: 1,
    minNumbers: 1,
    minUppercase: 1
  })
  readonly password: string;

}
