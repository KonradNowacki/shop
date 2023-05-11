import {EmailString} from "@shop/common-utils";

export interface SignupModel {
  email: EmailString;
  password: string;
  repeatedPassword: string;
}
