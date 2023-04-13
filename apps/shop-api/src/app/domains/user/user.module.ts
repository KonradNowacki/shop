import { Module } from '@nestjs/common';
import {UserController} from "./user.controller";
import {AuthController} from "./auth.controller";
import {UserService} from "./user.service";
import {User} from "./user.entity";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  controllers: [UserController, AuthController],
  providers: [
    UserService
  ]
})
export class UserModule {

}
