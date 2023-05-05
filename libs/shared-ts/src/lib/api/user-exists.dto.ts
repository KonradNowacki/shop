import {EmailString} from "@shop/shared-ts";
import {IsEmail, IsNotEmpty} from "class-validator";

export class UserExistsDto {

  @IsNotEmpty()
  @IsEmail()
  readonly email: EmailString | undefined;
}
