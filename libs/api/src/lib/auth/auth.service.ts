import {Injectable} from "@nestjs/common";
import {UserService} from "../user/user.service";
import * as bcrypt from 'bcrypt'
import {JwtService} from "@nestjs/jwt";
import {JwtUser} from "./auth.model";
import {EmailString} from "@shop/common-utils";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
  }

  async validateUser(email: EmailString, password: string) {
    const user = await this.userService.findUserByEmail(email);
    const isPasswordValid = await bcrypt.compare(password, user?.password);

    if (user && isPasswordValid) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loggingUserEmail: EmailString) {

    const {id, email} = await this.userService.findUserByEmail(loggingUserEmail)

    const payload: JwtUser = {
      user: { id, email }
    }

    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}
