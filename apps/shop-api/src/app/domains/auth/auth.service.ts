import {Body, Injectable} from "@nestjs/common";
import {UserService} from "../user/user.service";
import {EmailString} from "@shop/shared-ts";
import * as bcrypt from 'bcrypt'
import {JwtService} from "@nestjs/jwt";

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

  async login() {
    return {
      access_token: this.jwtService.sign({})
    }
  }
}
