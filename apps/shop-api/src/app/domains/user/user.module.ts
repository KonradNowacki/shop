import { Module } from '@nestjs/common';
import {AuthController} from "./auth.controller";
import {UserService} from "./user.service";
import {User} from "./user.entity";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  controllers: [AuthController],
  providers: [
    UserService
  ]
})
export class UserModule {

}
