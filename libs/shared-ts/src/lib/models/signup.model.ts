import {EmailString} from "@shop/shared-ts";

export interface SignupModel {
  email: EmailString;
  password: string;
  repeatedPassword: string;
}
