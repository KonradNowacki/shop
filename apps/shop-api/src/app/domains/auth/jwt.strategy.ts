import {Injectable, Req} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SECRET' // TODO KN Move outside code
    });
  }

  async validate(payload: any) {
    const user = payload.user;

    if (!user) {
      // TODO KN Handle error
    }

    const { id, email } = user;
    return { id, email }
  }
}
