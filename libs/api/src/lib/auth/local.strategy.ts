import {PassportStrategy} from "@nestjs/passport";
import {Strategy} from "passport-local";
import {Injectable, UnauthorizedException} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {EmailString} from "@shop/shared-ts";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: EmailString, password: string) {

    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException()
    }

    return user;
  }
}
