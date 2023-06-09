import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtUser } from './auth.model';
import {EmailString, StorageKey} from '@shop/common-utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

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
    const { id, email, roles } = await this.userService.findUserByEmail(
      loggingUserEmail
    );

    const payload: JwtUser = {
      user: { id, email, roles },
    };

    return {
      [StorageKey.ACCESS_TOKEN]: this.jwtService.sign(payload),
    };
  }
}
