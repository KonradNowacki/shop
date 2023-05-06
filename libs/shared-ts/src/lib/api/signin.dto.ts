import {IsEmail, IsNotEmpty, IsString} from "class-validator";
import {EmailString} from "@shop/shared-ts";

export class SigninDto {

  @IsNotEmpty()
  @IsEmail()
  readonly email: EmailString | undefined;

  @IsNotEmpty()
  @IsString()
  readonly password: string | undefined;

}
