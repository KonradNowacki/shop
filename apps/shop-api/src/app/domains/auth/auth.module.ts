import {forwardRef, Module} from "@nestjs/common";
import {UserModule} from "../user/user.module";
import {AuthService} from "./auth.service";
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "./local.strategy";
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule,
    JwtModule.register({
      secret: 'SECRET',
      signOptions: {
        expiresIn: '60s'
      }
    })
  ],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService]
})
export class AuthModule {}
