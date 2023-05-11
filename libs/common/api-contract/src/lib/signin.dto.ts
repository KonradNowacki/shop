import {IsEmail, IsNotEmpty, IsString} from "class-validator";
import {EmailString} from "@shop/common-utils";

export class SigninDto {

  @IsNotEmpty()
  @IsEmail()
  readonly email?: EmailString;

  @IsNotEmpty()
  @IsString()
  readonly password?: string;

}
