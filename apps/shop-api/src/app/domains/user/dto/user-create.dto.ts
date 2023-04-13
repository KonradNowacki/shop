import {IsEmail, IsStrongPassword} from "class-validator";
import {EmailString} from "@shop/shared-ts";

export class UserCreateDto {

  @IsEmail()
  readonly email: EmailString;

  @IsStrongPassword({
    minLength: 8,
    minSymbols: 1,
    minNumbers: 1,
    minUppercase: 1
  })
  readonly password: string;

}
